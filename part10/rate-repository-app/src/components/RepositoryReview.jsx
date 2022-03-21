import { View, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { format } from 'date-fns';
import { DELETE_REVIEW } from "../graphql/mutations";
import Text from "./Text";

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
  },
  rating: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: '#0366d6',
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 60,
    marginBottom: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonBlue: {
    width: 200,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0366d6',
    marginTop: 10,
    borderRadius: 3,
  },
  buttonRed: {
    width: 200,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d73a4a',
    marginTop: 10,
    borderRadius: 3,
  },
});

const RepositoryReview = ({ review, from, refetch }) => {
  const navigate = useNavigate();

  const [ deleteReview ] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const handleDelete = (deleteReviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review',
      [
        {
          text: 'CANCEL',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: async () => await deleteReview({ variables: { deleteReviewId } }),
        },
      ],
    );

    refetch();
  };

  return (
    <View style={styles.card}>
      <View style={styles.rating}>
        <Text color='primary' fontWeight='bold'>{review.rating}</Text>
      </View>
      {from === 'MyReviewList'
        ?
          <Text style={styles.text} fontWeight='bold'>{review.repository.fullName}</Text>
        :
          <Text style={styles.text} fontWeight='bold'>{review.user.username}</Text>
      }
      <Text style={styles.text} color='textSecondary'>{format(new Date(review.createdAt), 'dd-MM-yyy')}</Text>
      <Text style={styles.text}>{review.text}</Text>
      {from === 'MyReviewList' &&
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => navigate(`/repositories/${review.repository.id}`)}>
            <Text style={styles.buttonBlue} color='white' fontWeight='bold'>View repository</Text>
          </Pressable>
          <Pressable onPress={() => handleDelete(review.id)}>
            <Text style={styles.buttonRed} color='white' fontWeight='bold'>Delete review</Text>
          </Pressable>
        </View>
      }
    </View>
  );
};

export default RepositoryReview;
