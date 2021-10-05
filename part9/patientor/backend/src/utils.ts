/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

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
const parseDateOfBirth = (date: unknown): string => {
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

export const toNewPatientEntry = (bodyObject: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(bodyObject.name),
    dateOfBirth: parseDateOfBirth(bodyObject.dateOfBirth),
    ssn: parseSSN(bodyObject.ssn),
    gender: parseGender(bodyObject.gender),
    occupation: parseOccupation(bodyObject.occupation)
  };
  return newEntry;
};