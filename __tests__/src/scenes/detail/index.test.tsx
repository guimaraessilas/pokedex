import { render, RenderResult } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Detail from '../../../../src/scenes/detail';
import { store } from '../../../../store';

jest.mock('@expo/vector-icons', () => 'Icon');
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
const mockedFunction = jest.fn();

const props = {
  navigation: {
    goBack: mockedFunction,
  },
};

const renderDetailScreen = (): RenderResult =>
  render(
    <Provider store={store}>
      <Detail {...props} />
    </Provider>
  );

describe('Should test detail screen', () => {
  describe('test snapshot', () => {
    it('should render detail screen correctly', () => {
      const tree = renderDetailScreen().toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
