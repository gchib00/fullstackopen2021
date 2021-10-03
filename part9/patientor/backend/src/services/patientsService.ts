import patientsData from '../data/patients.json';
import { PatientEntry } from '../types';

const entries: Array<PatientEntry> = patientsData as Array<PatientEntry>;

const getEntires = (): Array<PatientEntry> => {
  return entries;
};
const getSecuredEntries = (): Omit<PatientEntry, 'ssn'>[] => {
  return entries.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

export default { getEntires, getSecuredEntries };