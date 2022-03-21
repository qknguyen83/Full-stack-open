import { StyleSheet, View, FlatList } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_BY_ID } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import RepositoryReview from "./RepositoryReview";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
  const id = useParams().id;

  const variables = {
    first: 6,
    repositoryId: id,
  };

  const result = useQuery(GET_REPOSITORY_BY_ID, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !result.loading && result.data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    result.fetchMore({
      variables: {
        after: result.data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  if (result.loading) return null;

  const reviewNodes = result.data.repository.reviews
    ? result.data.repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ListHeaderComponent={() => <RepositoryItem item={result.data.repository} single={true} />}
      renderItem={({ item }) => (
        <>
          <ItemSeparator />
          <RepositoryReview review={item} />
        </>
      )}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepositoryView;
