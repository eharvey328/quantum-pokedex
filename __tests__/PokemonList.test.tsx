import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import {
  PAGE_SIZE,
  PokemonList,
  PokemonListProps,
} from "@components/ListView/PokemonList";
import { mockPokemonList } from "./helpers/mocks";
import { LIST_POKEMONS } from "@lib/queries";

describe("PokemonList", () => {
  const props: PokemonListProps = { search: "", type: "", isFavorite: false };
  const mockResponse = {
    request: {
      query: LIST_POKEMONS,
      variables: {
        query: {
          limit: PAGE_SIZE,
          search: props.search,
          filter: { type: props.type },
        },
      },
    },
    result: {
      data: { pokemons: mockPokemonList },
    },
  };

  it("renders loading message", () => {
    render(
      <MockedProvider mocks={[mockResponse]} addTypename={false}>
        <PokemonList {...props} />
      </MockedProvider>
    );
    const message = screen.getByText("Loading...");
    expect(message).toBeInTheDocument();
  });

  it("renders error message", async () => {
    const mockWithError = {
      ...mockResponse,
      error: new Error("An error occurred"),
    };
    render(
      <MockedProvider mocks={[mockWithError]} addTypename={false}>
        <PokemonList {...props} />
      </MockedProvider>
    );
    const message = await screen.findByText("Unable to retrieve results.");
    expect(message).toBeInTheDocument();
  });

  it("renders empty message", async () => {
    const mockWithEmpty = {
      ...mockResponse,
      result: { data: { pokemons: null } },
    };
    render(
      <MockedProvider mocks={[mockWithEmpty]} addTypename={false}>
        <PokemonList {...props} />
      </MockedProvider>
    );
    const message = await screen.findByText("No Pokémon Found.");
    expect(message).toBeInTheDocument();
  });

  it("renders all items as a list", async () => {
    render(
      <MockedProvider mocks={[mockResponse]} addTypename={false}>
        <PokemonList {...props} />
      </MockedProvider>
    );
    const list = await screen.findAllByRole("listitem");
    expect(list.length).toEqual(mockPokemonList.edges.length);
  });
});
