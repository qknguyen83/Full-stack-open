import { NewPatientInfo, NewPatientEntry } from '../types';
import {
  parseName, parseDateOfBirth, parseSSN, parseGender, parseOccupation,
  parseDescription, parseDate, parseSpecialist, parseDischarge, parseEmployerName, parseHealthCheckRating,
  parseDiagnosisCodes, parseSickLeave
} from './parsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientInfo = (object: any): NewPatientInfo => {
  const newPatientInfo: NewPatientInfo = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };

  return newPatientInfo;
};

const assertNever = (value: unknown) => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (newEntry: any): NewPatientEntry => {
  if (newEntry.type === 'Hospital') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry: NewPatientEntry = {
      type: 'Hospital',
      description: parseDescription(newEntry.description),
      date: parseDate(newEntry.date),
      specialist: parseSpecialist(newEntry.specialist),
      ...(newEntry.diagnosisCodes) && {diagnosisCodes: parseDiagnosisCodes(newEntry.diagnosisCodes)},
      discharge: parseDischarge(newEntry.discharge.date, newEntry.discharge.criteria)
    };

    return newPatientEntry;
  }
  else if (newEntry.type === 'OccupationalHealthcare') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry: NewPatientEntry = {
      type: 'OccupationalHealthcare',
      description: parseDescription(newEntry.description),
      date: parseDate(newEntry.date),
      specialist: parseSpecialist(newEntry.specialist),
      ...(newEntry.diagnosisCodes) && {diagnosisCodes: parseDiagnosisCodes(newEntry.diagnosisCodes)},
      employerName: parseEmployerName(newEntry.employerName),
      ...(newEntry.sickLeave) && {sickLeave: parseSickLeave(newEntry.sickLeave.startDate, newEntry.sickLeave.endDate)}
    };

    return newPatientEntry;
  }
  else if (newEntry.type === 'HealthCheck') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry: NewPatientEntry = {
      type: 'HealthCheck',
      description: parseDescription(newEntry.description),
      date: parseDate(newEntry.date),
      specialist: parseSpecialist(newEntry.specialist),
      ...(newEntry.diagnosisCodes) && {diagnosisCodes: parseDiagnosisCodes(newEntry.diagnosisCodes)},
      healthCheckRating: parseHealthCheckRating(newEntry.healthCheckRating)
    };

    return newPatientEntry;
  }

  return assertNever(newEntry);
};
