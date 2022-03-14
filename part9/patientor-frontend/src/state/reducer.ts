import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  |
    {
      type: 'SET_DIAGNOSES';
      payload: Diagnosis[]
    }
  |
    {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  |
    {
      type: 'ADD_PATIENT_ENTRY';
      payload: {
        patientEntry: Entry,
        id: string
      }
    }
  |
    {
      type: 'VISIT_PATIENT';
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: action.payload
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'ADD_PATIENT_ENTRY':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: state.patients[action.payload.id].entries.concat(action.payload.patientEntry)
          }
        },
        visitedPatient: {
          ...state.visitedPatient,
          entries: state.visitedPatient.entries.concat(action.payload.patientEntry)
        }
      };
    case 'VISIT_PATIENT':
      return {
        ...state,
        visitedPatient: action.payload
      };
    default:
      return state;
  }
};
