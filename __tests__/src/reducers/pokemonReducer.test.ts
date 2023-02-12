import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockDitto } from '../../../mock/mockDitto';
import { mockPokemonList } from '../../../mock/mockPokemonList';
import { baseURL } from '../../../src/api/client';
import { pokemonsActions } from '../../../src/reducers/pokemonReducer';
import { PokemonState } from '../../../src/types/PokemonState';
import { store } from '../../../store';

const initialState = {
  loading: false,
  list: [],
  error: null,
  success: false,
  selected: null,
} as PokemonState;

const mockNetworkResponse = () => {
  const params = { limit: 20, offset: 0 };
  var mock = new MockAdapter(axios);
  mock
    .onGet(`${baseURL}pokemon?limit=${params.limit}&&offset=${params.offset}`)
    .reply(200, mockPokemonList);
  mock.onGet(`${baseURL}pokemon/ditto`).reply(200, mockDitto);
};

const mockNetworkErrorResponse = () => {
  const params = { limit: 20, offset: 0 };
  var mock = new MockAdapter(axios);
  mock
    .onGet(`${baseURL}pokemon?limit=${params.limit}&&offset=${params.offset}`)
    .reply(404);
  mock.onGet(`${baseURL}pokemon/ditto`).reply(404);
};

describe('reducers tests', () => {
  it('should initialize state', () => {
    const state = store.getState().pokemon;
    expect(state).toEqual(initialState);
  });

  it('should return selector', () => {
    const state = store.getState().pokemon;
    expect(state).toEqual(initialState);
  });

  describe('Test success case of slices', () => {
    beforeAll(() => {
      mockNetworkResponse();
    });
    it('Should be able to fetch pokemon list', async () => {
      const params = { limit: 20, offset: 0 };
      const result = await store.dispatch(pokemonsActions.getAll(params));
      expect(result.type).toBe('pokemon/getAll/fulfilled');
    });

    it('Should be able to fetch pokemon by name', async () => {
      const result = await store.dispatch(
        pokemonsActions.searchByName('ditto')
      );
      expect(result.type).toBe('pokemon/searchByName/fulfilled');
    });

    it('Should be able to fetch pokemon by id', async () => {
      const result = await store.dispatch(pokemonsActions.searchById(132));
      expect(result.type).toBe('pokemon/searchById/fulfilled');
    });
  });

  describe('Test reject case of slices', () => {
    it('Should not be able to fetch pokemon list', async () => {
      const result = await store.dispatch({ type: 'pokemon/getAll/rejected' });
      expect(result.type).toBe('pokemon/getAll/rejected');
    });
    it('Should not be able to fetch pokemon by Name', async () => {
      const result = await store.dispatch({
        type: 'pokemon/searchByName/rejected',
      });
      expect(result.type).toBe('pokemon/searchByName/rejected');
    });
    it('Should not be able to fetch pokemon by Id', async () => {
      const result = await store.dispatch({
        type: 'pokemon/searchById/rejected',
      });
      expect(result.type).toBe('pokemon/searchById/rejected');
    });
  });
});
