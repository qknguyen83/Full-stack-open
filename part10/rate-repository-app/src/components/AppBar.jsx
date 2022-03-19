import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import Text from './Text';
import Constants from 'expo-constants';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  padding: {
    paddingBottom: 10,
    paddingLeft: 10,
  },
});

const AppBar = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const result = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  const signOut = async () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/signin')
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable onPress={() => navigate('/')}>
          <Text style={styles.padding} color='white' fontWeight='bold' fontSize='subheading'>
            Repositories
          </Text>
        </Pressable>
        {!result.loading && !result.data.me
          ?
            <Pressable onPress={() => navigate('/signin')}>
              <Text style={styles.padding} color='white' fontWeight='bold' fontSize='subheading'>
                Sign in
              </Text>
            </Pressable>
          :
            <Pressable onPress={signOut}>
              <Text style={styles.padding} color='white' fontWeight='bold' fontSize='subheading'>
                Sign out
              </Text>
            </Pressable>
        }
      </ScrollView>
    </View>
  )
};

export default AppBar;
