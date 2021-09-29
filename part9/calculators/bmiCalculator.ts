const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

const calculateBmi = (height: number, weight: number) => {
  height = height / 100 //convert into meters
  const bmiScore = weight/(height*height) //bmi formula

  switch(true){
    case (bmiScore < 18.5): {
      return 'Underweight'
    }
    case (bmiScore >= 18.5 && bmiScore <= 24.9): {
      return 'Normal (healthy weight)'
    }
    case (bmiScore >= 25 && bmiScore <= 29.9): {
      return 'Overweight'
    }
    default: return 'Obese'
  }
}
// calculateBmi(height, weight)
console.log(calculateBmi(180, 74))