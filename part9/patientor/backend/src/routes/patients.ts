import express from 'express';
import  patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils'; 

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getSecuredEntries());
});
router.post('/', (req, res) => {
  const typedBody = toNewPatientEntry(req.body);
  const newPatient = patientsService.addEntry(
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
export default router;