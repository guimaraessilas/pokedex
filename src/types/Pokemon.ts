export type PokemonTypes = {
  type: {
    name: string;
  };
};

export type Ability = {
  ability: {
    name?: string;
  };
};

export type Pokemon = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  id: number;
  types: PokemonTypes[];
  abilities: Ability[];
  species: {
    url: string;
  };
  egg_groups: {
    name?: string;
  }[];
  habitat: {
    name?: string;
  };
  flavor_text_entries: {
    flavor_text?: string;
  }[];
};
