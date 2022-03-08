interface InputValues1 {
  h: number,
  w: number
}

const parseArguments1 = (args: Array<string>): InputValues1 => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      h: Number(args[2]),
      w: Number(args[3])
    };
  }
  else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (h: number, w: number): string => {
  const bmi = w / (h * h) * 10000;

  if (bmi < 18.5) {
    return 'Below normal weight';
  }
  else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal weight';
  }
  else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  }
  else if (bmi >= 30 && bmi < 35) {
    return 'Class I Obesity';
  }
  else if (bmi >= 35 && bmi < 40) {
    return  'Class II Obesity';
  }

  return 'Class III Obesity';
};

try {
  const { h, w } = parseArguments1(process.argv);
  console.log(calculateBmi(h, w));
}
catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
