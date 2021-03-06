import patientsData from '../data/patients';
import { PatientEntry, Gender, SickLeave, Discharge } from '../types';
import { uuid } from 'uuidv4';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const entries: Array<PatientEntry> = patientsData as Array<PatientEntry>;

const getEntires = (): Array<PatientEntry> => {
  return entries;
};
const getSecuredEntries = (): Omit<PatientEntry, 'ssn'>[] => {
  return entries.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({id, name, dateOfBirth, gender, occupation, entries}));
};
const addPatient = (name: string, dateOfBirth: string, gender: Gender, occupation:string, ssn: string): Array<PatientEntry> => {
  const id = uuid();
  const newPatient = {
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    occupation: occupation,
    ssn: ssn,
    id: id, 
    entries: []
  };
  entries.push(newPatient);
  return entries;
};
const addHealthCheckEntry = (
  userID: string, 
  date: string, 
  description: string,
  specialist: string, 
  diagnosisCodes: string[] | undefined, 
  healthCheckRating: number): Array<PatientEntry> => 
  {
  const id = uuid();
  const newEntry = {
    type: 'HealthCheck',
    date: date,
    description: description,
    specialist: specialist,
    diagnosisCodes: diagnosisCodes,
    id: id, 
    healthCheckRating: healthCheckRating
  };
  const newEntriesArr = entries.map(patient => {
    if(patient.id == userID) {
      patient.entries.push(newEntry);
      return patient;
    }
    return patient;
  });
  return newEntriesArr;
};
const addOccupationalHealthcareEntry = (
  userID: string, 
  date: string, 
  description: string,
  specialist: string, 
  diagnosisCodes: string[] | undefined,
  sickLeave: SickLeave | undefined,
  employerName: string): Array<PatientEntry> => 
  {
  const id = uuid();
  const newEntry = {
    type: 'OccupationalHealthcare',
    date: date,
    description: description,
    specialist: specialist,
    diagnosisCodes: diagnosisCodes,
    id: id, 
    employerName: employerName,
    sickLeave: sickLeave
  };
  const newEntriesArr = entries.map(patient => {
    if(patient.id == userID) {
      patient.entries.push(newEntry);
      return patient;
    }
    return patient;
  });
  return newEntriesArr;
};
const addHospitalEntry = (
  userID: string, 
  date: string, 
  description: string,
  specialist: string, 
  diagnosisCodes: string[] | undefined,
  discharge: Discharge): Array<PatientEntry> => 
  {
  const id = uuid();
  const newEntry = {
    type: 'Hospital',
    date: date,
    description: description,
    specialist: specialist,
    diagnosisCodes: diagnosisCodes,
    id: id, 
    discharge: discharge
  };
  const newEntriesArr = entries.map(patient => {
    if(patient.id == userID) {
      patient.entries.push(newEntry);
      return patient;
    }
    return patient;
  });
  return newEntriesArr;
};
const getPatient = (id: string): PatientEntry | undefined => {
  const patient = entries.find(entry => entry.id === id);
  if(patient){
    return patient;
  }
  return undefined;
};

export default { getEntires, getSecuredEntries, addPatient, getPatient, addHealthCheckEntry, addOccupationalHealthcareEntry, addHospitalEntry };