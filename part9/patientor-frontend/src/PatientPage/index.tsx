import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, visitPatient, addPatientEntry } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient, Entry, NewPatientEntry } from '../types';
import { Button } from '@material-ui/core';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: {entry: Entry}) => {
  const [{ diagnoses },] = useStateValue();

  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          <p>entry date: {entry.date}</p>
          <p>entry description: {entry.description}</p>
          <p>diagnoses:</p>
          {entry.diagnosisCodes && entry.diagnosisCodes.map((code, index) => {
            const diagnose = diagnoses.find(diagnose => diagnose.code === code);
            return <li key={index}>{code} {diagnose && diagnose.name}</li>;
          })}
          {entry.discharge && <p>discharge date: {entry.discharge.date}</p>}
          {entry.discharge && <p>discharge criteria: {entry.discharge.criteria}</p>}
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <p>entry date: {entry.date}</p>
          <p>entry description: {entry.description}</p>
          <p>diagnoses:</p>
          {entry.diagnosisCodes && entry.diagnosisCodes.map((code, index) => {
            const diagnose = diagnoses.find(diagnose => diagnose.code === code);
            return <li key={index}>{code} {diagnose && diagnose.name}</li>;
          })}
          <p>employer: {entry.employerName}</p>
          {entry.sickLeave &&
            <div>
              <p>sick leave start date: {entry.sickLeave.startDate}</p>
              <p>sick leave end date: {entry.sickLeave.endDate}</p>
            </div>
          }
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case 'HealthCheck':
      return (
        <div>
          <p>entry date: {entry.date}</p>
          <p>entry description: {entry.description}</p>
          <p>diagnoses:</p>
          {entry.diagnosisCodes && entry.diagnosisCodes.map((code, index) => {
            const diagnose = diagnoses.find(diagnose => diagnose.code === code);
            return <li key={index}>{code} {diagnose && diagnose.name}</li>;
          })}
          <p>health check rating: {entry.healthCheckRating}</p>
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ visitedPatient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewPatientEntry) => {
    try {
      const newEntry = { ...values };
      if (newEntry.type === 'OccupationalHealthcare' && newEntry.sickLeave?.startDate === '') {
        delete newEntry.sickLeave;
      }
      const { data: newPatientEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        newEntry
      );
      dispatch(addPatientEntry(newPatientEntry, id as string));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(String(e?.response?.data?.error) || 'Unrecognized axios error');
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  useEffect(() => {
    const getPatient = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(visitPatient(patient));
      }
      catch (error) {
        console.log(error.message);
      }
    };

    if (visitedPatient.id != id) {
      void getPatient();
    }
  }, []);

  if (visitedPatient.id !== id) {
    return null;
  }

  return (
    <div>
      <div>
        <h2>{visitedPatient.name}</h2>
        <p>ssn: {visitedPatient.ssn}</p>
        <p>occupation: {visitedPatient.occupation}</p>
      </div>
      <div>
        <h3>entries</h3>
        {visitedPatient.entries.map((entry, index) =>
          <EntryDetails key={index} entry={entry}/>
        )}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
