import { View, Image, StyleSheet } from 'react-native';
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
  alignCenter: {
    textAlign: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  const rounder = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }

    return num;
  }

  return (
    <View style={styles.card}>
      <View>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        <Text style={styles.name} fontWeight='bold'>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.language} color='white'>{item.language}</Text>
      </View>
      <View style={styles.stats}>
        <View>
          <Text style={styles.alignCenter} fontWeight='bold'>{rounder(item.stargazersCount)}</Text>
          <Text style={styles.alignCenter}>Stars</Text>
        </View>
        <View>
          <Text style={styles.alignCenter} fontWeight='bold'>{rounder(item.forksCount)}</Text>
          <Text style={styles.alignCenter}>Forks</Text>
        </View>
        <View>
          <Text style={styles.alignCenter} fontWeight='bold'>{rounder(item.reviewCount)}</Text>
          <Text style={styles.alignCenter}>Reviews</Text>
        </View>
        <View>
          <Text style={styles.alignCenter} fontWeight='bold'>{rounder(item.ratingAverage)}</Text>
          <Text style={styles.alignCenter}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
