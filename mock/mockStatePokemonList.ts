import { Pokemon } from '../src/types/Pokemon';

export const mockStatePokemonList = [
  {
    name: 'bulbasaur',
    id: 1,
    types: [
      {
        type: { name: 'grass' },
      },
      {
        type: { name: 'poison' },
      },
    ],
    abilities: [
      {
        ability: {
          name: 'overgrow',
        },
      },
      {
        ability: {
          name: 'chlorophyll',
        },
      },
    ],
    species: {
      url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
    },
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    egg_groups: [{ name: 'monster' }],
    flavor_text_entries: [{ flavor_text: 'text' }],
    habitat: [{ name: 'mountains' }],
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
] as Pokemon[];
