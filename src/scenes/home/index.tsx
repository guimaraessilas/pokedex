import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { api } from '../../api/api';

import Card from '../../components/Card';
import { Pokemon } from '../../types/Pokemon';
import Loading from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { results } = await api.getAll(offset, limit);
    const payloadPokemons: Pokemon[] = await Promise.all(
      results.map(async (pokemon: Pokemon) => {
        const { id, types, abilities, species } = await api.getDetails(
          pokemon.url
        );
        return { name: pokemon.name, id, types, abilities, species };
      })
    );
    setPokemons(pokemons.concat(payloadPokemons));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  const loadMoreData = () => {
    setOffset(offset + limit);
  };

  if (loading && pokemons.length === 0) {
    return <Loading />;
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokedex</Text>
      </View>
      <FlatList
        data={pokemons}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            types={item.types}
            onPress={() => navigation.navigate('Detail', item)}
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
