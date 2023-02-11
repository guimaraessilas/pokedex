import { colors } from '../constants/colors';
import { PokemonTypes } from '../types/Pokemon';

export const getColor = (types: PokemonTypes[]) => {
  if (types && types.length > 0) {
    return `${colors[types[0].type.name]}`;
  } else {
    return `${colors.normal}99`;
  }
};
