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
  gender: Gender;
  occupation: string; 
  entries: Entry[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >;

export type NewPatientEntry = Omit<PatientEntry, 'id' | 'entries' >;

export enum Gender {
  Male = 'male',
  Female = 'female'
}
