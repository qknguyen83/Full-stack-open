import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';

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

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable onPress={() => navigate('/')}>
          <Text style={styles.padding} color='white' fontWeight='bold' fontSize='subheading'>
            Repositories
          </Text>
        </Pressable>
        <Pressable onPress={() => navigate('/signin')}>
          <Text style={styles.padding} color='white' fontWeight='bold' fontSize='subheading'>
            Sign in
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  )
};

export default AppBar;
