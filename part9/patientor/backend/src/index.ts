import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';


const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.get('/ping', (_req, res) => {
  res.send('pong!');
});
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});