import patients from '../../data/patients';
import { PatientWithoutSSN, Patient, NewPatientInfo, PublicPatient, NewPatientEntry, Entry } from '../types';
import { v1 as uuid} from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatientById = (id: string): PublicPatient => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (newPatientInfo: NewPatientInfo): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...newPatientInfo
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (id: string, newPatientEntry: NewPatientEntry): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...newPatientEntry
  };

  patients.forEach(patient => {
    if (patient.id === id) {
      patient.entries.push(newEntry);
    }
  });

  return newEntry;
};

export default {
  getPatients,
  getPatientsWithoutSSN,
  getPatientById,
  addPatient,
  addEntry
};
