import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortBy, debouncedFilter) => {
  const orderBy = sortBy === 'CREATED_AT' ? sortBy : 'RATING_AVERAGE';
  const orderDirection = sortBy === 'CREATED_AT' ? 'DESC' : sortBy;

  const variables = {
    first: 6,
    orderBy,
    orderDirection,
    ...(debouncedFilter !== '') && { searchKeyword: debouncedFilter },
  };

  const result = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !result.loading && result.data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    result.fetchMore({
      variables: {
        after: result.data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    loading: result.loading,
    ...(!result.loading) && { repositories: result.data.repositories },
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;
