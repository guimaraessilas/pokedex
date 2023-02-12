import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PokemonTypeList from '../../components/PokemonTypeList';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';
import { pokemonsSelector } from '../../reducers/pokemonReducer';
import { getColor } from '../../utils/getColors';
import { loadStoragedPokemons } from '../../utils/loadStoragedPokemons';
import { keys } from '../../constants/keys';

const Detail = ({ navigation }: { navigation: { goBack: () => void } }) => {
  const { selected, loading } = useSelector(pokemonsSelector);
  const [captured, setCaptured] = useState(false);
  const [textButton, setTextButton] = useState('Trow Pokeball');
  const [storagedPokemons, setStoragedPokemons] = useState<number[]>([]);

  const catchPokemon = async (id: number) => {
    try {
      const gotcha = Math.random() >= 0.5;
      if (gotcha) {
        const newPokemonList = [...storagedPokemons, id];
        setStoragedPokemons(newPokemonList);
        await AsyncStorage.setItem(
          keys.BILL_PC,
          JSON.stringify(newPokemonList)
        );
      } else {
        setTextButton('Wanna try again?');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStoragedPokemons(setStoragedPokemons);
  }, []);

  useEffect(() => {
    if (selected) {
      setCaptured(storagedPokemons.includes(selected.id));
    }
  }, [storagedPokemons]);

  useEffect(() => {
    if (captured) {
      setTextButton('Gotcha!');
    }
  }, [captured]);

  if (loading) {
    return <Loading />;
  } else if (!!selected) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: `${getColor(selected?.types)}99` },
        ]}
      >
        <View style={styles.header}>
          <MaterialCommunityIcons
            onPress={() => navigation.goBack()}
            name="arrow-left"
            size={24}
            color="white"
          />
          {captured && (
            <MaterialCommunityIcons
              onPress={() => navigation.goBack()}
              name="pokeball"
              size={24}
              color="white"
            />
          )}
        </View>

        <View style={styles.pokemonIdentification}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{selected?.name}</Text>
            <PokemonTypeList horizontal types={selected?.types} />
          </View>
          <View>
            <Text style={styles.pokedexNumber}>
              #{String(selected?.id).padStart(4, '0')}
            </Text>
          </View>
        </View>
        <Image
          source={{
            uri: selected?.sprites.front_default,
          }}
          style={styles.picture}
        />
        <View style={styles.status}>
          <View style={styles.textContainer}>
            <Text style={styles.flavorText}>
              {selected?.flavor_text_entries[0].flavor_text}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.listContainer}>
              <Text style={styles.listText}>Abilities: </Text>
              {selected?.abilities.map(({ ability }, index) => (
                <Text key={ability.name} style={styles.listText}>
                  {` ${ability.name}`}
                  {index !== selected.abilities.length - 1 && ','}
                </Text>
              ))}
            </View>
            <View style={styles.listContainer}>
              <Text style={styles.listText}>Species: </Text>
              {selected?.egg_groups.map((specie, index) => (
                <Text key={specie.name} style={styles.listText}>
                  {` ${specie.name}`}
                  {index !== selected.egg_groups.length - 1 && ','}
                </Text>
              ))}
            </View>
            <View style={styles.listContainer}>
              <Text style={styles.listText}>Habitat: </Text>
              <Text style={styles.listText}>{selected?.habitat.name}</Text>
            </View>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 40,
                backgroundColor: getColor(selected.types),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
              disabled={captured}
              onPress={() => catchPokemon(selected.id)}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>{textButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
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
    height: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  nameContainer: {
    justifyContent: 'space-evenly',
    height: 75,
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
    marginBottom: -80,
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
