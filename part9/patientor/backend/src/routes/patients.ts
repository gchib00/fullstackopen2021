import express from 'express';
import  patientsService from '../services/patientsService';
import { toNewPatientEntry, toNewEntry } from '../utils'; 

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getSecuredEntries());
});
router.post('/', (req, res) => {
  const typedBody = toNewPatientEntry(req.body);
  const newPatient = patientsService.addPatient(
    typedBody.name,
    typedBody.dateOfBirth,
    typedBody.gender,
    typedBody.occupation,
    typedBody.ssn
  );
  res.json(newPatient);
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatient(id);
  res.json(patient);
});
router.post('/:id/entries', (req, res ) => {
  // const patientID = req.params.id; 
  const typedBody = toNewEntry(req.body);
  const newEntry = patientsService.addHospitalEntry(
    req.params.id,
    typedBody.date,
    typedBody.description,
    typedBody.specialist,
    typedBody.diagnosisCodes,
    typedBody.healthCheckRating
  );
  res.json(newEntry);
});

export default router;