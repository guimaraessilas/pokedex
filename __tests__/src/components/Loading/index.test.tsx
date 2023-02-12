import React from 'react';
import 'react-native';
import { create } from 'react-test-renderer';
import Loading from '../../../../src/components/Loading';

const setup = () => create(<Loading />).toJSON();

it('Should render Loader correctly', () => {
  const tree = setup();
  expect(tree).toMatchSnapshot();
});
