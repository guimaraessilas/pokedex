import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../../components/Card';
import Loading from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  pokemonsActions,
  pokemonsSelector,
} from '../../reducers/pokemonReducer';
import { loadStoragedPokemons } from '../../utils/loadStoragedPokemons';

export default function Home() {
  const dispatch = useDispatch<any>();
  const { list, loading, selected } = useSelector(pokemonsSelector);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const fetchData = () => {
    dispatch(pokemonsActions.getAll({ offset, limit }));
  };

  const [storagedPokemons, setStoragedPokemons] = useState<number[]>([]);

  useEffect(() => {
    loadStoragedPokemons(setStoragedPokemons);
  }, []);

  useEffect(() => {
    fetchData();
  }, [offset]);

  const loadMoreData = () => {
    setOffset(offset + limit);
  };

  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const searchPokemonByName = () => {
    dispatch(pokemonsActions.searchByName(search));
  };

  const openDetail = (id: number) => {
    dispatch(pokemonsActions.searchById(id));
  };

  useEffect(() => {
    if (selected !== null) {
      navigation.navigate('Detail');
    }
  }, [selected]);

  if (loading && list.length === 0) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokedex</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={(text) => setSearch(text)}
          style={styles.searchInput}
          placeholder="Pesquisar..."
        />
        <TouchableOpacity
          disabled={search.length === 0}
          onPress={() => searchPokemonByName()}
          style={{
            borderColor: '#606060',
            borderWidth: 1,
            height: 30,
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
          }}
        >
          <Text style={{ margin: 4 }}>Pesquisar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            key={`${item.id}-${item.name}`}
            id={item.id}
            captured={storagedPokemons.includes(item.id)}
            name={item.name}
            types={item.types}
            sprites={item.sprites}
            onPress={() => openDetail(item.id)}
          />
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.9}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    height: 40,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    borderRadius: 10,
    borderColor: '#606060',
    borderWidth: 1,
    marginRight: 8,
    height: 40,
    paddingLeft: 12,
    width: '80%',
  },
  container: {
    flex: 1,
  },
  header: {
    height: 90,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    margin: 16,
    fontWeight: '700',
    color: '#555555',
  },
});
