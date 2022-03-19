import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    loading: result.loading,
    ...(!result.loading) && { repositories: result.data.repositories },
  };
};

export default useRepositories;
