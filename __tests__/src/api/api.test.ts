import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { baseURL } from '../../../src/api/client';
import { api } from '../../../src/api/api';
import { mockPokemonList } from '../../../mock/mockPokemonList';
import { mockDitto } from '../../../mock/mockDitto';

describe('fetch pokemons', () => {
  describe('when api call is successfull', () => {
    it('should return pokemon list', async () => {
      const { limit, offset } = { offset: 0, limit: 20 };
      var mock = new MockAdapter(axios);
      const data = mockPokemonList;
      mock
        .onGet(`${baseURL}pokemon?limit=${limit}&&offset=${offset}`)
        .reply(200, mockPokemonList);

      api.getAll(offset, limit);

      expect(data).toEqual(mockPokemonList);
    });
    it('should return detailed data', async () => {
      var mock = new MockAdapter(axios);
      const data = mockPokemonList;
      mock.onGet(`${baseURL}pokemon/ditto`).reply(200, mockDitto);

      api.getDetails(`${baseURL}pokemon/ditto`);

      expect(data).toEqual(mockPokemonList);
    });
  });
});
