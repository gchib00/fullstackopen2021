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

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating,
}