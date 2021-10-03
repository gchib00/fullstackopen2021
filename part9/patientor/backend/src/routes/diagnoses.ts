import express from 'express';
import diagnosesServices from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesServices.getEntries());
});

export default router;