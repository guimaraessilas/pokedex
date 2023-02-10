import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PokemonTypes } from '../../types/Pokemon';
import { colors } from '../../utils/colors';

type PokemonTypeProps = {
  types: PokemonTypes[];
  horizontal?: boolean;
};

const PokemonTypeList = ({ types, horizontal }: PokemonTypeProps) => {
  return (
    <View style={[styles.container, horizontal && { flexDirection: 'row' }]}>
      {types?.map(({ type }) => (
        <View
          key={type.name}
          style={[
            styles.textContainer,
            { backgroundColor: `${colors[type.name]}` },
          ]}
        >
          <Text style={styles.typeTitle}>{type.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default PokemonTypeList;

const styles = StyleSheet.create({
  textContainer: {
    height: 32,
    paddingHorizontal: 5,
    marginBottom: 4,
    marginRight: 12,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  typeTitle: {
    padding: 5,
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  container: {
    alignSelf: 'flex-start',
  },
});
