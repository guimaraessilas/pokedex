import AsyncStorage from '@react-native-async-storage/async-storage';
import { keys } from '../../../src/constants/keys';
import { loadStoragedPokemons } from '../../../src/utils/loadStoragedPokemons';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockFunction = jest.fn();

describe('test loadStoragedPokemons', () => {
  it('should call async getItem', async () => {
    await loadStoragedPokemons(mockFunction);
    expect(AsyncStorage.getItem).toBeCalledWith(keys.BILL_PC);
  });
});
