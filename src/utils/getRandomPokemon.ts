const MAX_DEX_ID = 898;

export const getRandomPokemon = (): number =>
  Math.floor(Math.random() * MAX_DEX_ID) + 1;
