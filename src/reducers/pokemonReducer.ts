import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { baseURL } from '../api/client';
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
  searchByName: createAsyncThunk(
    'pokemon/searchByName',
    async (search: string) => {
      const data = await api.getDetails(`${baseURL}pokemon/${search}`);
      const { name, id, types, abilities, species, sprites }: Pokemon =
        await api.getDetails(`${baseURL}pokemon/${data.id}`);

      const { flavor_text_entries, egg_groups, habitat } = await api.getDetails(
        species.url
      );

      const selected = {
        name,
        id,
        types,
        abilities,
        species,
        sprites,
        flavor_text_entries,
        egg_groups,
        habitat,
      } as Pokemon;

      return selected;
    }
  ),
  searchById: createAsyncThunk(
    'pokemon/searchById',
    async (pokemonId: number) => {
      const { name, id, types, abilities, species, sprites }: Pokemon =
        await api.getDetails(`${baseURL}pokemon/${pokemonId}`);
      const { flavor_text_entries, egg_groups, habitat } = await api.getDetails(
        species.url
      );
      const selected = {
        name,
        id,
        types,
        abilities,
        species,
        flavor_text_entries,
        sprites,
        egg_groups,
        habitat,
      } as Pokemon;

      return selected;
    }
  ),
};

const initialState = {
  loading: false,
  list: [],
  error: null,
  success: false,
  selected: null,
} as PokemonState;

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pokemonsActions.searchByName.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      pokemonsActions.searchByName.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.selected = payload;
      }
    );
    builder.addCase(
      pokemonsActions.searchByName.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        state.selected = null;
      }
    );

    builder.addCase(pokemonsActions.searchById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      pokemonsActions.searchById.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.selected = payload;
      }
    );
    builder.addCase(
      pokemonsActions.searchById.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        state.selected = null;
      }
    );

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
