import { View, Image, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
  },
  image: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  name: {
    marginLeft: 60,
    marginBottom: 5,
  },
  description: {
    marginLeft: 60,
    marginBottom: 5,
  },
  language: {
    marginLeft: 60,
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  }
});

const RepositoryItem = ({ item, single }) => {
  const rounder = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }

    return num;
  }

  return (
    <View style={styles.card} testID='repositoryItem'>
      <View>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        <Text style={styles.name} fontWeight='bold'>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.language} color='white'>{item.language}</Text>
      </View>
      <View style={styles.stats}>
        <View>
          <Text style={{ textAlign: 'center' }} fontWeight='bold'>{rounder(item.stargazersCount)}</Text>
          <Text style={{ textAlign: 'center' }}>Stars</Text>
        </View>
        <View>
          <Text style={{ textAlign: 'center' }} fontWeight='bold'>{rounder(item.forksCount)}</Text>
          <Text style={{ textAlign: 'center' }}>Forks</Text>
        </View>
        <View>
          <Text style={{ textAlign: 'center' }} fontWeight='bold'>{rounder(item.reviewCount)}</Text>
          <Text style={{ textAlign: 'center' }}>Reviews</Text>
        </View>
        <View>
          <Text style={{ textAlign: 'center' }} fontWeight='bold'>{rounder(item.ratingAverage)}</Text>
          <Text style={{ textAlign: 'center' }}>Rating</Text>
        </View>
      </View>
      {single &&
        <Pressable style={{ alignItems: 'center' }} onPress={() => Linking.openURL(item.url)}>
          <Text style={styles.button} color='white' fontWeight='bold'>Open in GitHub</Text>
        </Pressable>
      }
    </View>
  );
};

export default RepositoryItem;
