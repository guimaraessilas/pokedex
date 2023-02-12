import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Home from '../../../../src/scenes/home';
import { store } from '../../../../store';
jest.mock('@expo/vector-icons', () => 'Icon');
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
const mockedFunction = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedFunction }),
}));

const renderHomeScreen = (): RenderResult =>
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

test('Renders HomeScreen', () => {
  const tree = renderHomeScreen().toJSON();
  expect(tree).toMatchSnapshot();
});
