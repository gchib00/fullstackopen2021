export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<BaseEntry>;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating,
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
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string
  }
}

export type AcceptableEntries = Omit<OccupationalHealthCareEntry, 'id'> | Omit<HealthCheckEntry, 'id'> | Omit<HospitalEntry, 'id'>

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}