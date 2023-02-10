import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pokemon } from '../../types/Pokemon';
import { colors } from '../../utils/colors';
import PokemonTypeList from '../PokemonTypeList';

class Card extends React.PureComponent {
  render() {
    const { name, types, id, onPress } = this.props as Pokemon & {
      onPress: () => void;
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          { backgroundColor: `${colors[types[0].type.name]}cc` },
        ]}
      >
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <PokemonTypeList types={types} />
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
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
    paddingLeft: 12,
  },
  title: {
    fontSize: 24,
    textTransform: 'capitalize',
    alignSelf: 'flex-start',
    color: 'white',
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 6,
  },
});
