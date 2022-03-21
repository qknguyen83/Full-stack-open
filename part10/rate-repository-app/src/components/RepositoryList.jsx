import React, { useState } from 'react';
import { FlatList, View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortingFilteringMenu = ({ filter, setFilter, sortBy, setSortBy }) => {
  return (
    <View>
      <TextInput style={{ height: 30 }} value={filter} onChange={(event) => setFilter(event.target.value)} />
      <Picker
        style={{ height: 50 }}
        selectedValue={sortBy}
        onValueChange={(itemValue) => setSortBy(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="CREATED_AT" />
        <Picker.Item label="Highest rated repositories" value="DESC" />
        <Picker.Item label="Lowest rated repositories" value="ASC" />
      </Picker>
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { filter, setFilter, sortBy, setSortBy } = this.props;
    return (
      <SortingFilteringMenu
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    );
  };

  render() {
    const { repositories, fetchMore, navigate } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 500);
  const [sortBy, setSortBy] = useState('CREATED_AT');
  const { repositories, fetchMore } = useRepositories(sortBy, debouncedFilter);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      fetchMore={fetchMore}
      navigate={navigate}
      filter={filter}
      setFilter={setFilter}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
};

export default RepositoryList;
