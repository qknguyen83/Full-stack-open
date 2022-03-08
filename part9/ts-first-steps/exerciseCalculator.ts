type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string
}

interface InputValues2 {
  arr: Array<number>,
  target: number
}

const parseArguments2 = (args: Array<string>): InputValues2 => {
  if (args.length < 3) throw new Error('Not enough arguments');
  if (args.length === 3) throw new Error('Not enough training days');

  const input = args.slice(2).map(value => Number(value));

  if (input.includes(NaN)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    arr: input.slice(1),
    target: input[0]
  };
};

export const calculateExercises = (arr: Array<number>, target: number): Result => {
  const average: number = arr.reduce((result, current) => result + current / arr.length, 0);
  const rating: Rating = average >= target ? average - target >= 3 ? 3 : 2 : 1;
  const ratingDescription: Array<string> = ['bad', 'good', 'very good'];

  return {
    periodLength: arr.length,
    trainingDays: arr.filter(day => day > 0).length,
    target: target,
    average: average,
    success: average >= target ? true : false,
    rating: rating,
    ratingDescription: ratingDescription[rating - 1]
  };
};

try {
  const { arr, target } = parseArguments2(process.argv);
  console.log(calculateExercises(arr, target));
}
catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
