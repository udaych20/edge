import React from 'react';
import { Patient } from '../types';

interface PatientSelectionProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient) => void;
  isLoading: boolean;
  loadImage: () => void;
  analyzeImage: () => void;
}

const PatientSelection: React.FC<PatientSelectionProps> = ({
  patients,
  selectedPatient,
  setSelectedPatient,
  isLoading,
  loadImage,
  analyzeImage
}) => {
  return (
    <div className="p-6 mb-6 transition-colors duration-300 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <label htmlFor="patientName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Patient Name
          </label>
          <select
            id="patientName"
            className="w-full px-3 py-2 transition-colors duration-200 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={selectedPatient?.patientId || ''}
            onChange={(e) => {
              const selected = patients.find(p => p.patientId === e.target.value);
              if (selected) setSelectedPatient(selected);
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <option>Loading patients...</option>
            ) : patients.length === 0 ? (
              <option>No patients available</option>
            ) : (
              patients.map((patient) => (
                <option key={patient.patientId} value={patient.patientId}>
                  {patient.patientName || 'Unnamed Patient'}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Patient Details</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name:</span>
              <p className="text-gray-800 dark:text-gray-200">
                {selectedPatient?.patientName || '-'}
              </p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">ID:</span>
              <p className="text-gray-800 dark:text-gray-200">
                {selectedPatient?.patientId || '-'}
              </p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Birth Date:</span>
              <p className="text-gray-800 dark:text-gray-200">
                {selectedPatient?.patientBirthDate || '-'}
              </p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender:</span>
              <p className="text-gray-800 dark:text-gray-200">
                {selectedPatient?.patientSex || '-'}
              </p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Age:</span>
              <p className="text-gray-800 dark:text-gray-200">
                {selectedPatient?.patientAge || '-'}
              </p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight:</span>
              <p className="text-gray-800 dark:text-gray-200">
                {selectedPatient?.patientWeight || '-'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={loadImage}
              disabled={!selectedPatient}
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-green-700 dark:hover:bg-green-800"
            >
              Load Image
            </button>
            
            <button
              onClick={analyzeImage}
              disabled={!selectedPatient}
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Analyze
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSelection;