import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientInfo from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getPatientsWithoutSSN());
});

router.post('/', (req, res) => {
  try {
    const newPatientInfo = toNewPatientInfo(req.body);
    const newPatient = patientsService.addPatient(newPatientInfo);

    res.json(newPatient);
  }
  catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
