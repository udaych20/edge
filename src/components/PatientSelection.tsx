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
    <div className="p-4 transition-colors duration-300 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <div className="flex flex-wrap items-center gap-6">
        <div className="w-64">
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
                    >
                      {patient.patientName || `Patient ${patient.patientId}`}
                    </option>
                  ))}
                </>
              )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">ID:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {selectedPatient?.patientId || '-'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">DOB:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {selectedPatient?.patientBirthDate || '-'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Gender:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {selectedPatient?.patientSex || '-'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Age:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {selectedPatient?.patientAge || '-'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Weight:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {selectedPatient?.patientWeight ? `${selectedPatient.patientWeight} kg` : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSelection;