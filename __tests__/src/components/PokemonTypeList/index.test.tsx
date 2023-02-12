import React from 'react';
import 'react-native';
import { create } from 'react-test-renderer';
import PokemonTypeList from '../../../../src/components/PokemonTypeList';

const props = {
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

const setup = () => create(<PokemonTypeList {...props} />).toJSON();

it('Should render PokemonTypeList correctly', () => {
  const tree = setup();
  expect(tree).toMatchSnapshot();
});
