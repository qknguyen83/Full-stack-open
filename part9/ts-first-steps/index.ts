import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const h = Number(req.query.height);
  const w = Number(req.query.weight);

  if (!h || !w) {
    res.send('malformatted parameters');
  }
  else {
    res.send({
      height: h,
      weight: w,
      bmi: calculateBmi(h, w)
    });
  }
});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.send('parameters missing');
  }
  else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    daily_exercises = daily_exercises.map((day: any) => Number(day));
    target = Number(target);
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
    if (daily_exercises.includes(NaN) || isNaN(target)) {
      res.send('malformatted parameters');
    }
    else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      res.json(calculateExercises(daily_exercises, target));
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
