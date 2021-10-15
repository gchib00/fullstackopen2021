/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, NewHealthCheckEntry, NewOccupationalHealthCareEntry, SickLeave, NewHospitalEntry, Discharge} from './types';

//type guards:
const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
//
const parseName = (name: unknown): string => {
  if(!name || !isString(name)){
    throw new Error('Name is missing or is of wrong format');
  }
  return name;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date)){
    throw new Error('Date is missing or is of wrong format');
  }
  return date;
};
const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)){
    throw new Error('ssn is missing or is of wrong format');
  }
  return ssn;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)){
    throw new Error('Occupation is missing or is of wrong format');
  }
  return occupation;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};
const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)){
    throw new Error('Dccupation is missing or is of wrong format');
  }
  return description;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)){
    throw new Error('specialist is missing or is of wrong format');
  }
  return specialist;
};
const parseDiagnosisCodes = (diagnosisCodes: string[] | undefined): string[] | undefined => {
  if (!diagnosisCodes) {return undefined;}
  const hasNonStringValue = diagnosisCodes.some(code => {
    typeof code !== 'string';
  });
  if(hasNonStringValue){throw new Error('One of the codes is of wrong format!');}
  return diagnosisCodes;
  
};
const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  const value = Number(healthCheckRating);
  if (!(value >= 0 && value <= 3)) {
    throw new Error('Wrong health check rating input!');
  }
  return value;
};
const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  if (typeof sickLeave.startDate !== 'string' || typeof sickLeave.endDate !== 'string') {
    throw new Error('Start date or end date are of wrong format.');
  }
  return sickLeave as SickLeave;
};
const parseDischarge = (discharge: any): Discharge => {
  if (typeof discharge.date !== 'string' || typeof discharge.criteria !== 'string') {
    throw new Error('Date format or criteria format is wrong!');
  }
  return discharge as Discharge;
};

////////////////////////

export const toNewPatientEntry = (bodyObject: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(bodyObject.name),
    dateOfBirth: parseDate(bodyObject.dateOfBirth),
    ssn: parseSSN(bodyObject.ssn),
    gender: parseGender(bodyObject.gender),
    occupation: parseOccupation(bodyObject.occupation)
  };
  return newEntry;
};
export const toNewHealthCheckEntry = (bodyObject: NewHealthCheckEntry): NewHealthCheckEntry => {
  const newEntry: NewHealthCheckEntry = {
    type: 'HealthCheck',
    date: parseDate(bodyObject.date),
    description: parseDescription(bodyObject.description),
    specialist: parseSpecialist(bodyObject.date),
    diagnosisCodes: parseDiagnosisCodes(bodyObject.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(bodyObject.healthCheckRating)
  };
  return newEntry;
};

export const toNewOccupationalHealthcareEntry = (bodyObject: NewOccupationalHealthCareEntry): NewOccupationalHealthCareEntry => {
  const newEntry: NewOccupationalHealthCareEntry = {
    type: 'OccupationalHealthcare',
    date: parseDate(bodyObject.date),
    description: parseDescription(bodyObject.description),
    specialist: parseSpecialist(bodyObject.date),
    diagnosisCodes: parseDiagnosisCodes(bodyObject.diagnosisCodes),
    employerName: parseName(bodyObject.employerName),
    sickLeave: parseSickLeave(bodyObject.sickLeave)
  };
  return newEntry;
};
export const toNewHospitalEntry = (bodyObject: NewHospitalEntry): NewHospitalEntry => {
  const newEntry: NewHospitalEntry = {
    type: 'Hospital',
    date: parseDate(bodyObject.date),
    description: parseDescription(bodyObject.description),
    specialist: parseSpecialist(bodyObject.date),
    diagnosisCodes: parseDiagnosisCodes(bodyObject.diagnosisCodes),
    discharge: parseDischarge(bodyObject.discharge)
  };
  return newEntry;
};