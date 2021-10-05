import express from 'express';
import  patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils';
// import { NewPatientEntry } from '../types';
 

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getSecuredEntries());
});
router.post('', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const {name, dateOfBirth, ssn, gender, occupation} = req.body;
  const typedBody = toNewPatientEntry(req.body);
  const newPatient = patientsService.addEntry(
    typedBody.name,
    typedBody.dateOfBirth,
    typedBody.ssn,
    typedBody.gender,
    typedBody.occupation
  );
  res.json(newPatient);
});

export default router;