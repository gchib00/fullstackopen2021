export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string; 
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female'
}
