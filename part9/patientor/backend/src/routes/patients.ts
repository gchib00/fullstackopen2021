import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry, toNewHealthCheckEntry, toNewOccupationalHealthcareEntry, toNewHospitalEntry } from '../utils'; 

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
  switch(req.body.type) {
    case("HealthCheck"): {
      const typedBody = toNewHealthCheckEntry(req.body);
      const newEntry = patientsService.addHealthCheckEntry(
        req.params.id,
        typedBody.date,
        typedBody.description,
        typedBody.specialist,
        typedBody.diagnosisCodes,
        typedBody.healthCheckRating
      );
      return res.json(newEntry);
    }
    case("OccupationalHealthcare"): {
      const typedBody = toNewOccupationalHealthcareEntry(req.body);
      const newEntry = patientsService.addOccupationalHealthcareEntry(
        req.params.id,
        typedBody.date,
        typedBody.description,
        typedBody.specialist,
        typedBody.diagnosisCodes,
        typedBody.sickLeave,
        typedBody.employerName,
      );
      return res.json(newEntry);
    }
    case("Hospital"): {
      const typedBody = toNewHospitalEntry(req.body);
      const newEntry = patientsService.addHospitalEntry(
        req.params.id,
        typedBody.date,
        typedBody.description,
        typedBody.specialist,
        typedBody.diagnosisCodes,
        typedBody.discharge
      );
      return res.json(newEntry);
    }
    default: throw new Error('Type of your request does not match any of the existing entry types!');
  }
});

export default router;