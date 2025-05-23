import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import PatientSelection from './components/PatientSelection';
import ImageAnalysisPanel from './components/ImageAnalysisPanel';
import { Patient } from './types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retries = 3, delayMs = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await delay(delayMs);
      console.log(`Retry attempt ${attempt} of ${retries}...`);
    }
  }
};

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [maskedImage, setMaskedImage] = useState<string>('');
  const [prediction, setPrediction] = useState<string>('-');
  const [isReanalysis, setIsReanalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWithRetry('http://52.230.108.4:8097/api/orthanc/patients');
      setPatients(data);
      if (data.length > 0) {
        setSelectedPatient(data[0]);
      }
    } catch (err) {
      const errorMessage = 'Unable to load patient data. Please check your network connection or try again later. If the problem persists, contact support.';
      setError(errorMessage);
      console.error('Error fetching patients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadImage = () => {
    if (!selectedPatient) return;
    
    const imageUrl = `http://52.230.108.4:8097/api/orthanc/get-image-old/${selectedPatient.patientId}`;
    setCurrentImage(imageUrl);
    setMaskedImage('');
    setPrediction('-');
    setIsReanalysis(false);
    setIsAnalyzing(false);
  };

  const analyzeImage = async (isSecondOpinion = false) => {
    if (!currentImage || !selectedPatient) return;
    
    setIsAnalyzing(true);
    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('files', blob, 'image.tiff');
      
      const predictionUrl = isSecondOpinion 
        ? 'http://20.184.8.188:8509/predict'
        : 'http://20.184.8.188:8510/predict';
      
      const predictionResponse = await fetch(predictionUrl, {
        method: 'POST',
        body: formData
      });
      
      const data = await predictionResponse.json();
      const predictionResult = data.prediction[0][0] === 1.0 
        ? 'One Anomaly Detected' 
        : 'No Anomalies Detected';
      
      setPrediction(predictionResult);
      setIsReanalysis(isSecondOpinion);
      
      // Use the same overlay image for both first analysis and reanalysis
      const maskedImagePath = `/assets/scans/overlay_${selectedPatient.patientId}.jpg`;
      setMaskedImage(maskedImagePath);
    } catch (err) {
      console.error('Error analyzing image:', err);
      alert('Error analyzing image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const submitFeedback = async (comments: string) => {
    if (!selectedPatient) return;
    
    try {
      const submission = {
        patientId: selectedPatient.patientId,
        patientName: selectedPatient.patientName,
        analysisResult: prediction,
        feedback: '',
        comments,
        patientDetails: selectedPatient,
        isReanalysis
      };
      
      const response = await fetch('http://20.184.8.188:8084/feedback/saveUserFeedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Error submitting feedback.');
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen p-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <Header />
          
          {error && (
            <div className="p-4 mb-4 text-white bg-red-500 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <PatientSelection 
              patients={patients}
              selectedPatient={selectedPatient}
              setSelectedPatient={setSelectedPatient}
              isLoading={isLoading}
            />
            
            <ImageAnalysisPanel 
              currentImage={currentImage}
              maskedImage={maskedImage}
              prediction={prediction}
              submitFeedback={submitFeedback}
              onReanalyze={() => analyzeImage(true)}
              isReanalysis={isReanalysis}
              isAnalyzing={isAnalyzing}
              loadImage={loadImage}
              analyzeImage={() => analyzeImage(false)}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;