import { Formik } from 'formik';

import { SelectField, EntryTypeOption } from './FormField';
import { NewPatientEntry } from '../types';

import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';
import HealthCheckEntryForm from './HealthCheckEntryForm';

interface Props {
  onSubmit: (values: NewPatientEntry) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'HealthCheck', label: 'Health Check' }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        type: 'Hospital'
      }}
      onSubmit={() => console.log('never')}
    >
      {({ values }) => {
        return (
          <div>
            <SelectField label="Type" name="type" options={entryTypeOptions}/>
            {values.type === 'Hospital' && <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel}/>}
            {values.type === 'OccupationalHealthcare' && <OccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onCancel}/>}
            {values.type === 'HealthCheck' && <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel}/>}
          </div>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
