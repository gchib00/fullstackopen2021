interface Result {
  periodLength: number;
  trainingDays: number;
  targetScore: number;
  actualScore: number;
  success: boolean;
  rating: number;
  comment: string;
}

const target = Number(process.argv[2])
const trainingInfo: Array<number> = []
//populate trainingInfo with daily hours:
if (process.argv.length > 2)
for (let i=3; i<process.argv.length; i++){
  trainingInfo.push(Number(process.argv[i]))
}

const calculateExercises = (trainingInfo: Array<number>, target: number): Result => {
  const trainingDays = trainingInfo.filter(day => day !== 0).length
  const actualScore = ( trainingInfo.reduce((a, b) => a + b, 0) / trainingInfo.length) //arr average divided by length of the arr
  const isSuccess = actualScore >= target

  let rating;
  let comment;
  //determine rating:
  switch(true){
    case(actualScore<target): 
      rating=1
      break
    case(actualScore===target): 
      rating=2
      break
    case(actualScore>target): 
      rating=3
      break
  }
  //determine comment:
  switch(rating){
    case(1): 
      comment = 'Shame on you'
      break
    case(2): 
      comment = 'Could be better'
      break
    case(3): 
      comment = 'Great'
      break
  }

  const data = {
    periodLength: trainingInfo.length,
    trainingDays: trainingDays,
    targetScore: target,
    actualScore: actualScore,
    success: isSuccess,
    rating: rating,
    comment: comment
  }
  return data
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1))
console.log(calculateExercises(trainingInfo, target))