import diagnosesData from '../data/diagnoses.json';
import { DiagnoseEntry } from '../types';

const entries:Array<DiagnoseEntry> = diagnosesData as Array<DiagnoseEntry>;

const getEntries = ():Array<DiagnoseEntry> => {
  return entries;
};

export default {getEntries};