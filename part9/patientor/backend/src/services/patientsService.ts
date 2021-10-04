import patientsData from '../data/patients.json';
import { PatientEntry } from '../types';
import { uuid } from 'uuidv4';

const entries: Array<PatientEntry> = patientsData as Array<PatientEntry>;

const getEntires = (): Array<PatientEntry> => {
  return entries;
};
const getSecuredEntries = (): Omit<PatientEntry, 'ssn'>[] => {
  return entries.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};
const addEntry = (name: string, dateOfBirth: string, gender: string, occupation:string, ssn: string): Array<PatientEntry> => {
  const id = uuid();
  const newPatient = {
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    occupation: occupation,
    ssn: ssn,
    id: id
  };
  entries.push(newPatient);
  return entries;
};

export default { getEntires, getSecuredEntries, addEntry };