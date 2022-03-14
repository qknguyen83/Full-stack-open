import { Gender, HealthCheckRating, Diagnosis } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringArray = (diagnosisCodes: any): diagnosisCodes is Array<string> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return diagnosisCodes.reduce((result: any, current: any) => result && isString(current), true);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw Error('Incorrect or missing name');
  }

  return name;
};

export const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw Error('Incorrect or missing date of birth');
  }

  return dateOfBirth;
};

export const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw Error('Incorrect or missing ssn');
  }

  return ssn;
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw Error('Incorrect or missing gender');
  }

  return gender;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw Error('Incorrect or missing occupation');
  }

  return occupation;
};

export const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw Error('Incorrect or missing description');
  }

  return description;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw Error('Incorrect or missing date');
  }

  return date;
};

export const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw Error('Incorrect or missing specialist');
  }

  return specialist;
};

export const parseDischarge = (date: unknown, criteria: unknown): { date: string, criteria: string } => {
  if (!date || !isString(date) || !isDate(date) || !criteria || !isString(criteria)) {
    throw Error('Incorrect or missing discharge infomation');
  }

  return {
    date: date,
    criteria: criteria
  };
};

export const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw Error('Incorrect or missing employer name');
  }

  return employerName;
};

export const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw Error('Incorrect or missing health check rating');
  }

  return healthCheckRating;
};

export const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !isStringArray(diagnosisCodes)) {
    throw Error('Incorrect or missing diagnosis code(s)');
  }

  return diagnosisCodes;
};

export const parseSickLeave = (startDate: unknown, endDate: unknown): { startDate: string, endDate: string } => {
  if (!startDate || !isString(startDate) || !isDate(startDate) || !endDate || !isString(endDate) || !isDate(endDate)) {
    throw Error('Incorrect or missing sick leave infomation');
  }

  return {
    startDate: startDate,
    endDate: endDate
  };
};
