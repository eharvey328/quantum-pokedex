import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { DetailView, PokemonByNameQuery } from "@components/DetailView";

import { mockPokemonDetail } from "./helpers/mocks";

describe("ListView", () => {
  const mockSlug = "bulbasaur";
  const mockResponse = {
    request: {
      query: PokemonByNameQuery,
      variables: {
        name: "bulbasaur",
      },
    },
    result: {
      data: { pokemonByName: mockPokemonDetail },
    },
  };

  it("renders loading message", async () => {
    render(
      <MockedProvider mocks={[mockResponse]} addTypename={false}>
        <DetailView slug={mockSlug} />
      </MockedProvider>
    );
    await screen.findByText("Loading...");
  });

  it("renders empty message on error", async () => {
    const mockWithError = {
      ...mockResponse,
      error: new Error("test error"),
    };
    render(
      <MockedProvider mocks={[mockWithError]} addTypename={false}>
        <DetailView slug={mockSlug} />
      </MockedProvider>
    );
    await screen.findByText("Pokémon not found.");
  });

  it("renders pokemon detail", async () => {
    render(
      <MockedProvider mocks={[mockResponse]} addTypename={false}>
        <DetailView slug={mockSlug} />
      </MockedProvider>
    );
    await screen.findByRole("heading", { name: mockPokemonDetail.name });
  });
});
