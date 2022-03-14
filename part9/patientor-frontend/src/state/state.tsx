import React, { createContext, useContext, useReducer } from 'react';
import { Patient, Gender, Diagnosis, Entry } from '../types';
import { Action } from './reducer';

export type State = {
  patients: { [id: string]: Patient },
  visitedPatient: Patient,
  diagnoses: Diagnosis[]
};

const initialState: State = {
  patients: {},
  visitedPatient: {
    id: '',
    name: '',
    occupation: '',
    gender: Gender.Other,
    entries: []
  },
  diagnoses: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]); 

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi
  };
};

export const setDiagnoses = (diagnosesFromApi: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnosesFromApi
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: newPatient
  };
};

export const addPatientEntry = (newEntry: Entry, id: string): Action => {
  return {
    type: 'ADD_PATIENT_ENTRY',
    payload: {
      patientEntry: newEntry,
      id: id
    }
  };
};

export const visitPatient = (patient: Patient): Action => {
  return {
    type: 'VISIT_PATIENT',
    payload: patient
  };
};
