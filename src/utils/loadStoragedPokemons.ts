import { AsyncStorage } from 'react-native';
import { keys } from '../constants/keys';

export const loadStoragedPokemons = async (
  callBack: (stored: number[]) => void
) => {
  try {
    const stored = await AsyncStorage.getItem(keys.BILL_PC);
    if (stored) {
      callBack(JSON.parse(stored));
    }
  } catch (error) {
    console.error(error);
  }
};
