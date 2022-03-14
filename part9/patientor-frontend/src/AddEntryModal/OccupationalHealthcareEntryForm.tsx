import { useStateValue } from '../state';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection } from './FormField';
import { NewPatientEntry } from '../types';

interface Props {
  onSubmit: (values: NewPatientEntry) => void;
  onCancel: () => void;
}

export const OccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const initialValues: NewPatientEntry = {
    type: 'OccupationalHealthcare',
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [''],
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: ''
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        let errors: { [field: string]: string } | { [field: string]: { [field:string]: string } } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if ((!values.sickLeave?.startDate && values.sickLeave?.endDate) || (values.sickLeave?.startDate && !values.sickLeave?.endDate)) {
          errors = {
            ...errors,
            sickLeave: {
              ...(!values.sickLeave?.startDate) && { startDate: requiredError },
              ...(!values.sickLeave?.endDate) && { endDate: requiredError }
            }
          };
        }
        return errors;
      }}
    >
      {({ dirty, isValid, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ float: 'right' }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareEntryForm;
