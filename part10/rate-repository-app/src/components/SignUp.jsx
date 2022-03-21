import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { CREATE_USER } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: 340,
    height: 44,
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 3,
  },
  button: {
    width: 340,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0366d6',
    marginTop: 10,
    borderRadius: 3,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username length must be between 1 and 30')
    .max(30, 'Username length must be betwwen 1 and 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password length must be between 5 and 50')
    .max(50, 'Password length must be betwwen 5 and 50')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirmation is incorrect')
    .required('Password confirmation is required'),
});

const CreateReview = () => {
  const navigate = useNavigate();

  const [ signUp ] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const onSubmit = async (values) => {
    const newUser = {
      username: values.username,
      password: values.password,
    };

    await signUp({ variables: { user: newUser } });

    navigate('/signin');
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return (
          <View style={styles.container}>
            <FormikTextInput style={styles.input} name='username' placeholder='Username' />
            <FormikTextInput style={styles.input} name='password' placeholder='Password' secureTextEntry />
            <FormikTextInput style={styles.input} name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry />
            <Pressable onPress={handleSubmit}>
              <Text style={styles.button} color='white' fontWeight='bold'>Sign up</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

export default CreateReview;
