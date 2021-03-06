interface Result {
  periodLength: number;
  trainingDays: number;
  targetScore: number;
  actualScore: number;
  success: boolean;
  rating: number;
  comment: string;
}

const calculateExercises = (trainingInfo: Array<number>, target: number): Result => {
  target = Number(target); //because target input might be a string type but number 
  if(trainingInfo === undefined || target === undefined) {
    throw new Error('parameters are missing...');
  }
  if(trainingInfo.some(isNaN) || isNaN(target)){
    throw new Error('malformatted parameters...');
  }

  const trainingDays = trainingInfo.filter(day => day !== 0).length;
  const actualScore = ( trainingInfo.reduce((a, b) => a + b, 0) / trainingInfo.length); //arr average divided by length of the arr
  const isSuccess = actualScore >= target;

  let rating;
  let comment;
  //determine rating:
  switch(true){
    case(actualScore<target): 
      rating=1;
      break;
    case(actualScore===target): 
      rating=2;
      break;
    case(actualScore>target): 
      rating=3;
      break;
    default: throw new Error('Something went wrong...');
  }
  //determine comment:
  switch(rating){
    case(1): 
      comment = 'Shame on you';
      break;
    case(2): 
      comment = 'Could be better';
      break;
    case(3): 
      comment = 'Great';
      break;
    default: throw new Error('Something went wrong...');
  }

  const data = {
    periodLength: trainingInfo.length,
    trainingDays: trainingDays,
    targetScore: target,
    actualScore: actualScore,
    success: isSuccess,
    rating: rating,
    comment: comment
  };
  return data;
};

export default calculateExercises;