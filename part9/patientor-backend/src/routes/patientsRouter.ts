import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientInfo, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getPatientsWithoutSSN());
});

router.get('/:id', (req, res) => {
  res.json(patientsService.getPatientById(req.params.id));
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

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newPatientEntry = toNewPatientEntry(req.body);
    const newEntry = patientsService.addEntry(id, newPatientEntry);

    res.json(newEntry);
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
