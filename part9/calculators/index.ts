import express from 'express'
const app = express()
import calculateBmi from './bmiCalculator'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})
app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  const bmiResult = calculateBmi(height, weight)

  if(!(height>0) || !(weight>0)){
    return res.send({
      error: 'malformatted parameters'
    })
  }

  return res.send({
    height: height,
    weight: weight,
    bmi: bmiResult
  })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});