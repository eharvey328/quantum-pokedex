export const mockPokemons = [
  {
    id: "001",
    name: "Bulbasaur",
    image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    types: ["Grass", "Poison"],
    isFavorite: true,
  },
  {
    id: "002",
    name: "Ivysaur",
    image: "https://img.pokemondb.net/artwork/ivysaur.jpg",
    types: ["Grass", "Poison"],
    isFavorite: false,
  },
  {
    id: "003",
    name: "Venusaur",
    image: "https://img.pokemondb.net/artwork/venusaur.jpg",
    types: ["Grass", "Poison"],
    isFavorite: false,
  },
  {
    id: "004",
    name: "Charmander",
    image: "https://img.pokemondb.net/artwork/charmander.jpg",
    types: ["Fire"],
    isFavorite: false,
  },
];

export const mockPokemonList = {
  limit: 20,
  offset: 0,
  count: 100,
  edges: mockPokemons,
};

export const mockPokemonDetail = {
  id: "001",
  number: 1,
  name: "Bulbasaur",
  image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
  weight: {
    minimum: "6.04kg",
    maximum: "7.76kg",
  },
  height: {
    minimum: "0.61m",
    maximum: "0.79m",
  },
  types: ["Grass", "Poison"],
  maxCP: 951,
  maxHP: 1071,
  evolutions: [
    {
      id: "002",
      name: "Ivysaur",
      image: "https://img.pokemondb.net/artwork/ivysaur.jpg",
    },
    {
      id: "003",
      name: "Venusaur",
      image: "https://img.pokemondb.net/artwork/venusaur.jpg",
    },
  ],
  previousEvolutions: [],
  sound: "https://play.pokemonshowdown.com/audio/cries/bulbasaur.mp3",
  isFavorite: true,
};
