import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PokemonTypeList from '../../components/PokemonTypeList';
import { Pokemon } from '../../types/Pokemon';
import Constants from 'expo-constants';
import { colors } from '../../utils/colors';
import { api } from '../../api/api';
import { PokemonDetails } from '../../types/PokemonDetails';
import Loading from '../../components/Loading';

const Detail = ({
  route,
  navigation,
}: {
  route: { params: Pokemon };
  navigation: { goBack: () => void };
}) => {
  const { name, types, id, abilities, species, sprites }: Pokemon =
    route.params;

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const data = await api.getDetails(species.url);
    setPokemonDetails(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `${colors[types[0].type.name]}99` },
      ]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={24}
          color="white"
        />
      </View>

      <View style={styles.pokemonIdentification}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <PokemonTypeList horizontal types={types} />
        </View>
        <View>
          <Text style={styles.pokedexNumber}>
            #{String(id).padStart(4, '0')}
          </Text>
        </View>
      </View>
      <Image
        source={{
          uri: sprites.front_default,
        }}
        style={styles.picture}
      />
      <View style={styles.status}>
        <View style={styles.textContainer}>
          <Text style={styles.flavorText}>
            {pokemonDetails?.flavor_text_entries[0].flavor_text}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.listContainer}>
            <Text style={styles.listText}>Abilities: </Text>
            {abilities.map(({ ability }, index) => (
              <Text key={ability.name} style={styles.listText}>
                {` ${ability.name}`}
                {index !== abilities.length - 1 && ','}
              </Text>
            ))}
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.listText}>Species: </Text>
            {pokemonDetails?.egg_groups.map((specie, index) => (
              <Text key={specie.name} style={styles.listText}>
                {` ${specie.name}`}
                {index !== pokemonDetails.egg_groups.length - 1 && ','}
              </Text>
            ))}
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.listText}>Habitat: </Text>
            <Text style={styles.listText}>{pokemonDetails?.habitat.name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  captureButton: {
    alignSelf: 'center',
    marginTop: 100,
  },
  container: {
    flex: 1,
  },
  header: {
    marginTop: Constants.statusBarHeight + 8,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  nameContainer: {
    justifyContent: 'space-evenly',
    height: 70,
  },
  name: {
    fontSize: 32,
    textTransform: 'capitalize',
    color: 'white',
    fontWeight: '700',
  },
  pokemonIdentification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  pokedexNumber: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
  picture: {
    height: 250,
    width: 200,
    alignSelf: 'center',
    marginBottom: -70,
    zIndex: 1,
  },
  status: {
    backgroundColor: 'white',
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  textContainer: {
    marginTop: 50,
    marginHorizontal: 40,
    flexDirection: 'column',
  },
  listText: {
    textTransform: 'capitalize',
    fontSize: 14,
  },
  listContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  flavorText: {
    justifyContent: 'center',
    fontSize: 16,
  },
});
