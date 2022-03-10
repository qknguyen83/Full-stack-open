import patients from '../../data/patients';
import { PatientWithoutSSN, Patient, NewPatientInfo } from '../types';
import { v1 as uuid} from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newPatientInfo: NewPatientInfo): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    id: uuid(),
    ...newPatientInfo
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getPatientsWithoutSSN,
  addPatient
};
