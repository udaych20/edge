import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import PatientSelection from './components/PatientSelection';
import ImageAnalysisPanel from './components/ImageAnalysisPanel';
import { Patient } from './types';

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [maskedImage, setMaskedImage] = useState<string>('');
  const [prediction, setPrediction] = useState<string>('-');
  const [isReanalysis, setIsReanalysis] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://52.230.108.4:8097/api/orthanc/patients');
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      const data = await response.json();
      setPatients(data);
      if (data.length > 0) {
        setSelectedPatient(data[0]);
      }
    } catch (err) {
      setError('Error loading patients. Please try again later.');
      console.error('Error fetching patients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadImage = () => {
    if (!selectedPatient) return;
    
    const imageUrl = `http://52.230.108.4:8097/api/orthanc/get-image-old/${selectedPatient.patientId}`;
    setCurrentImage(imageUrl);
    setMaskedImage(''); // Reset masked image when loading new image
    setPrediction('-'); // Reset prediction
    setIsReanalysis(false); // Reset reanalysis flag
    setPrediction('-'); // Reset prediction
    setIsReanalysis(false); // Reset reanalysis flag
  };

  const analyzeImage = async (isSecondOpinion = false) => {
  const analyzeImage = async (isSecondOpinion = false) => {
    if (!currentImage) return;
    
    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('files', blob, 'image.tiff');
      
      // Use different endpoint for reanalysis
      const predictionUrl = isSecondOpinion 
        ? 'http://20.184.8.188:8509/predict'  // Second opinion endpoint
        : 'http://20.184.8.188:8510/predict'; // Initial analysis endpoint
      
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
      setIsReanalysis(isSecondOpinion);
      
      // Load the corresponding masked image from assets
      const maskedImagePath = `/assets/scans/overlay_${selectedPatient?.patientId}.jpg`;
      setMaskedImage(maskedImagePath);
    } catch (err) {
      console.error('Error analyzing image:', err);
      alert('Error analyzing image.');
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
        patientDetails: selectedPatient,
        isReanalysis
      };
      
      const response = await fetch('http://20.184.8.188:8084/feedback/saveUserFeedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      
      if (response.ok) {
        alert('Feedback submitted successfully!');
      } else {
        alert('Failed to submit feedback.');
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Error submitting feedback.');
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen p-5 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <Header />
          
          {error && (
            <div className="p-4 mb-5 text-white bg-red-500 rounded-lg">
              {error}
            </div>
          )}
          
          <PatientSelection 
            patients={patients}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
            isLoading={isLoading}
            loadImage={loadImage}
            analyzeImage={() => analyzeImage(false)}
            analyzeImage={() => analyzeImage(false)}
          />
          
          <ImageAnalysisPanel 
            currentImage={currentImage}
            maskedImage={maskedImage}
            prediction={prediction}
            submitFeedback={submitFeedback}
            onReanalyze={() => analyzeImage(true)}
            isReanalysis={isReanalysis}
            onReanalyze={() => analyzeImage(true)}
            isReanalysis={isReanalysis}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;