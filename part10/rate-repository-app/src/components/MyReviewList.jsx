import { View, StyleSheet, FlatList } from 'react-native';
import { useQuery } from "@apollo/client";
import { ME } from '../graphql/queries';
import RepositoryReview from './RepositoryReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewList = () => {
  const result = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (result.loading) return null;

  const reviewNodes = result.data.me.reviews
    ? result.data.me.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryReview review={item} from='MyReviewList' refetch={result.refetch} />}
    />
  );
};

export default MyReviewList;
