import { Pokemon } from './Pokemon';

export type PokemonState = {
  loading: boolean;
  list: Pokemon[];
  error: any;
  success: boolean;
};
