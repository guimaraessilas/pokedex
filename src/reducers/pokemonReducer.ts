import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { Pokemon } from '../types/Pokemon';
import { PokemonState } from '../types/PokemonState';

export const pokemonsActions = {
  getAll: createAsyncThunk(
    'pokemon/getAll',
    async (params: { offset: number; limit: number }) => {
      const { results } = await api.getAll(params.offset, params.limit);
      const payloadPokemons: Pokemon[] = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const { id, types, abilities, species, sprites } =
            await api.getDetails(pokemon.url);
          return { name: pokemon.name, id, types, abilities, species, sprites };
        })
      );
      return payloadPokemons;
    }
  ),
  getDetails: createAsyncThunk('pokemon/getDetails', async (url: string) => {
    const response = await api.getDetails(url);
    return response;
  }),
};

const initialState = {
  loading: false,
  list: [],
  error: null,
  success: false,
} as PokemonState;

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pokemonsActions.getAll.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(pokemonsActions.getAll.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.list = state.list.concat(payload);
      state.success = false;
    });
    builder.addCase(pokemonsActions.getAll.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.list = [];
      state.success = false;
    });
  },
});

export default pokemonSlice.reducer;
export const pokemonsSelector = (state: { pokemon: PokemonState }) =>
  state.pokemon;
