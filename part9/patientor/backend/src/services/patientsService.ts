import patientsData from '../data/patients.json';
import { PatientEntry, Gender } from '../types';
import { uuid } from 'uuidv4';

const entries: Array<PatientEntry> = patientsData as Array<PatientEntry>;

const getEntires = (): Array<PatientEntry> => {
  return entries;
};
const getSecuredEntries = (): Omit<PatientEntry, 'ssn'>[] => {
  return entries.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({id, name, dateOfBirth, gender, occupation, entries}));
};
const addEntry = (name: string, dateOfBirth: string, gender: Gender, occupation:string, ssn: string): Array<PatientEntry> => {
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
const getPatient = (id: string): PatientEntry | undefined => {
  const patient = entries.find(entry => entry.id === id);
  if(patient){
    return patient;
  }
  return undefined;
};

export default { getEntires, getSecuredEntries, addEntry, getPatient };