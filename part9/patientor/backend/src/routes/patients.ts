import express from 'express';
import  patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils'; 

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getSecuredEntries());
});
router.post('', (req, res) => {
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