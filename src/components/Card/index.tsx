import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pokemon } from '../../types/Pokemon';
import PokemonTypeList from '../PokemonTypeList';
import { getColor } from '../../utils/getColors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Card extends React.PureComponent {
  render() {
    const { name, types, onPress, sprites, captured } = this
      .props as Pokemon & {
      onPress: () => void;
    } & { captured: boolean };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, { backgroundColor: `${getColor(types)}cc` }]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text style={styles.title}>{name}</Text>
          {captured && (
            <MaterialCommunityIcons size={16} color="white" name="pokeball" />
          )}
        </View>
        <View style={{ flexDirection: 'row', width: '100%', marginLeft: 12 }}>
          <PokemonTypeList types={types} />
          <Image
            source={{
              uri: sprites.front_default,
            }}
            style={styles.picture}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default Card;

const styles = StyleSheet.create({
  picture: {
    height: 150,
    width: 150,
    marginLeft: -10,
    marginTop: -20,
  },
  container: {
    width: '45%',
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    textTransform: 'capitalize',
    color: 'white',
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 6,
  },
});
