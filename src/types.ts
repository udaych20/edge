export interface Patient {
  patientId: string;
  patientName: string;
  patientBirthDate?: string;
  patientSex?: string;
  patientAge?: string;
  id?: string;
  [key: string]: any;
}