import React from 'react';
import { Patient } from '../types';
import { ChevronDown } from 'lucide-react';

interface PatientSelectionProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient) => void;
  isLoading: boolean;
}

const PatientSelection: React.FC<PatientSelectionProps> = ({
  patients,
  selectedPatient,
  setSelectedPatient,
  isLoading,
}) => {
  return (
    <div className="p-6 mb-6 transition-colors duration-300 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Patient Information
      </h3>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
          <label htmlFor="patientName" className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            Select Patient
          </label>
          <div className="relative">
            <select
              id="patientName"
              className="w-full px-3 py-2 text-sm transition-colors duration-200 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
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
                <>
                  <option value="" disabled>Select a patient</option>
                  {patients.map((patient) => (
                    <option 
                      key={patient.patientId} 
                      value={patient.patientId}
                      className="py-2"
                    >
                      {patient.patientName || `Patient ${patient.patientId}`}
                    </option>
                  ))}
                </>
              )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
          <span className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            Patient ID
          </span>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {selectedPatient?.patientId || '-'}
          </p>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
          <span className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            Date of Birth
          </span>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {selectedPatient?.patientBirthDate || '-'}
          </p>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
          <span className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            Gender
          </span>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {selectedPatient?.patientSex || '-'}
          </p>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
          <span className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            Age
          </span>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {selectedPatient?.patientAge || '-'}
          </p>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
          <span className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            Weight
          </span>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {selectedPatient?.patientWeight ? `${selectedPatient.patientWeight} kg` : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientSelection;