import { catchPokemon } from '../../../src/utils/catchPokemon';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('test catchPokemon method', () => {
  it('should catch', async () => {
    const onCallBack = jest.fn();
    const onErrorCallBack = jest.fn();
    const currentList = [1];
    const id = 1;
    catchPokemon(id, onCallBack, currentList, onErrorCallBack);

    expect(onCallBack).toHaveBeenCalled();
  });

  it("shouldn't catch", async () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.4;
    global.Math = mockMath;

    const onCallBack = jest.fn();
    const onErrorCallBack = jest.fn();
    const currentList = [1];
    const id = 1;
    catchPokemon(id, onCallBack, currentList, onErrorCallBack);

    expect(onErrorCallBack).toHaveBeenCalled();
  });
});
