import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Pokemon } from '../../types/Pokemon';
import { colors } from '../../utils/colors';

const Card = ({ name, types, id, url }: Pokemon) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `${colors[types[0].type.name]}cc` },
      ]}
    >
      <Text style={styles.title}>
        #{id} {name}
      </Text>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <View style={styles.typesContainer}>
          {types?.map(({ type }) => (
            <View
              style={[
                styles.typeContainer,
                { backgroundColor: `${colors[type.name]}` },
              ]}
            >
              <Text style={styles.typeTitle}>{type.name}</Text>
            </View>
          ))}
        </View>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          }}
          style={styles.picture}
        />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  picture: {
    height: 150,
    width: 150,
    marginLeft: -10,
    marginTop: -20,
  },
  typeContainer: {
    height: 30,
    paddingHorizontal: 5,
    marginBottom: 4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeTitle: {
    padding: 5,
    color: 'white',
    fontSize: 12,
  },
  typesContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
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
