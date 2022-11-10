import { render, screen } from "@testing-library/react";

import { Evolutions } from "@components/DetailView/Evolutions";

import { mockPokemonDetail } from "./helpers/mocks";

describe("Evolutions", () => {
  it("renders empty message", () => {
    const mockWithEmpty = {
      ...mockPokemonDetail,
      previousEvolutions: [],
      evolutions: [],
    };
    render(<Evolutions pokemon={mockWithEmpty} />);
    expect(screen.getByText(/none/i)).toBeInTheDocument();
  });

  it("renders list of evolution items", () => {
    const { previousEvolutions, evolutions } = mockPokemonDetail;
    render(<Evolutions pokemon={mockPokemonDetail} />);
    const items = screen.getAllByRole("link");
    expect(items.length).toEqual(
      previousEvolutions.length + evolutions.length + 1 // +1 for itself
    );
  });

  it("pokemon self is selected in the list", () => {
    render(<Evolutions pokemon={mockPokemonDetail} />);
    const self = screen.getByRole("link", {
      name: mockPokemonDetail.name.toLowerCase(),
    });
    expect(self.classList).toContain("evolution_selected");
  });
});
