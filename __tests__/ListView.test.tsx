import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { ListView } from "@components/ListView";
import { PAGE_SIZE } from "@components/ListView/PokemonList";
import { mockPokemonList } from "./helpers/mocks";
import { LIST_POKEMONS, POKEMON_TYPES } from "@lib/queries";

describe("ListView", () => {
  describe("initial render", () => {
    beforeEach(() => {
      render(
        <MockedProvider>
          <ListView search="" type="" favorite={0} />
        </MockedProvider>
      );
    });

    it("renders the input", () => {
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });
    it("renders the pill", () => {
      const pill = screen.getByRole("radiogroup");
      expect(pill).toBeInTheDocument();
    });
    it("renders the select", () => {
      const select = screen.getByPlaceholderText(/type/i);
      expect(select).toBeInTheDocument();
    });
  });

  describe("renders default values", () => {
    beforeEach(() => {
      const mockData = [
        {
          request: {
            query: POKEMON_TYPES,
          },
          result: {
            data: { pokemonTypes: ["Grass", "Fire"] },
          },
        },
      ];
      render(
        <MockedProvider mocks={mockData} addTypename={false}>
          <ListView search="test" type="Grass" favorite={1} />
        </MockedProvider>
      );
    });

    it("renders the input with default value", () => {
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("test");
    });
    it("renders the pill with default value", () => {
      const all = screen.getByRole("radio", { name: /all/i });
      const favorites = screen.getByRole("radio", { name: /favorites/i });
      expect(all).not.toBeChecked();
      expect(favorites).toBeChecked();
    });
    it("renders the select with default value", async () => {
      await screen.findByText(/grass/i, { selector: "button" });
    });
  });

  it("renders the pokemon list", async () => {
    const props = { search: "", type: "", favorite: 0 };
    const mockData = [
      {
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
      },
    ];
    render(
      <MockedProvider mocks={mockData} addTypename={false}>
        <ListView {...props} />
      </MockedProvider>
    );
    const list = await screen.findAllByRole("listitem");
    expect(list.length).toEqual(mockPokemonList.edges.length);
  });
});
