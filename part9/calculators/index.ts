// eslint-disable-next-line @typescript-eslint/no-explicit-any
import express from 'express';
const app = express();  
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmiResult = calculateBmi(height, weight);

  if(!(height>0) || !(weight>0)){
    return res.send({
      error: 'malformatted parameters'
    });
  }

  return res.send({
    height: height,
    weight: weight,
    bmi: bmiResult
  });
});
app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;
  res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});