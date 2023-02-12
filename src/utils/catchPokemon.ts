import AsyncStorage from '@react-native-async-storage/async-storage';
import { keys } from '../constants/keys';

export const catchPokemon = async (
  id: number,
  onCallBack: (newList: number[]) => void,
  currentList: number[],
  onErrorCallBack: (text: string) => void
) => {
  const gotcha = Math.random() >= 0.5;
  if (gotcha) {
    const newPokemonList = [...currentList, id];
    onCallBack(newPokemonList);
    await AsyncStorage.setItem(keys.BILL_PC, JSON.stringify(newPokemonList));
  } else {
    onErrorCallBack('Wanna try again?');
  }
};
