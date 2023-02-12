import React from 'react';
import 'react-native';
import { create } from 'react-test-renderer';
import Card from '../../../../src/components/Card';

jest.mock('@expo/vector-icons', () => 'Icon');

const props = {
  name: 'bulbasaur',
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  onPress: () => jest.fn(),
  sprites: {
    front_default: '',
  },
  captured: false,
};

const setup = () => create(<Card {...props} />).toJSON();

it('Should render Card with icon', () => {
  const tree = setup();
  expect(tree).toMatchSnapshot();
});
