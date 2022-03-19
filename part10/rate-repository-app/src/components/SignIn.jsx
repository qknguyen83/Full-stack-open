import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

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
  signin: {
    width: 340,
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#0366d6',
    marginTop: 10,
    borderRadius: 3,
  },
});

const SignIn = () => {
  const [ signIn ] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    }
    catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return (
          <View style={styles.container}>
            <FormikTextInput style={styles.input} name='username' placeholder='Username' />
            <FormikTextInput style={styles.input} name='password' placeholder='Password' secureTextEntry />
            <Pressable onPress={handleSubmit}>
              <Text style={styles.signin} color='white' fontWeight='bold'>Sign in</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

export default SignIn;
