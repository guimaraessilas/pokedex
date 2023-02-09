type PokemonTypes = {
  type: {
    name: string;
  };
};

export type Pokemon = {
  name: string;
  url: string;
  id: string;
  number?: string;
  types: PokemonTypes[];
};
