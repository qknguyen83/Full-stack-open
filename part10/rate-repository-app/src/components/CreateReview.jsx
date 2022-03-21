import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { CREATE_REVIEW } from '../graphql/mutations';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup
    .string(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [ createReview ] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const onSubmit = async (values) => {
    const newReview = {
      ...values,
      rating: Number(values.rating),
    };

    const response = await createReview({ variables: { review: newReview } });

    navigate(`/repositories/${response.data.createReview.repositoryId}`);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => {
        return (
          <View style={styles.container}>
            <FormikTextInput style={styles.input} name='ownerName' placeholder='Repository owner name' />
            <FormikTextInput style={styles.input} name='repositoryName' placeholder='Repository name' />
            <FormikTextInput style={styles.input} name='rating' placeholder='Rating between 0 and 100' />
            <FormikTextInput style={styles.input} name='text' placeholder='Review' multiline />
            <Pressable onPress={handleSubmit}>
              <Text style={styles.button} color='white' fontWeight='bold'>Create a review</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

export default CreateReview;
