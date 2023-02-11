export type PokemonTypes = {
  type: {
    name: string;
  };
};

export type Ability = {
  ability: {
    name: string;
  };
};

export type Pokemon = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  id: string;
  number?: string;
  types: PokemonTypes[];
  abilities: Ability[];
  species: {
    url: string;
  };
};
