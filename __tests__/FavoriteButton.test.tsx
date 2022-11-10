import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";

import { FavoriteButton, FavoriteButtonProps } from "@components/shared";

const favoriteSpy = jest.fn().mockResolvedValue(null);
const unFavoriteSpy = jest.fn().mockResolvedValue(null);

jest.mock("@lib/mutations", () => ({
  useFavorite() {
    return [favoriteSpy];
  },
  useUnFavorite() {
    return [unFavoriteSpy];
  },
}));

describe("FavoriteButton", () => {
  const mockId = "001";
  const props: FavoriteButtonProps = {
    isFavorite: false,
    pokemonId: mockId,
    onError: jest.fn(),
  };

  it("renders", () => {
    render(
      <MockedProvider>
        <FavoriteButton {...props} />
      </MockedProvider>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders favorite", () => {
    render(
      <MockedProvider>
        <FavoriteButton {...props} />
      </MockedProvider>
    );
    const button = screen.getByRole("button", { name: /favorite/i });
    const svg = screen.getByRole("img");
    expect(button).toBeInTheDocument();
    expect(svg.classList).not.toContain("favorited");
  });

  it("renders unfavorite", () => {
    render(
      <MockedProvider>
        <FavoriteButton {...props} isFavorite />
      </MockedProvider>
    );
    const button = screen.getByRole("button", { name: /unfavorite/i });
    const svg = screen.getByRole("img");
    expect(button).toBeInTheDocument();
    expect(svg.classList).toContain("favorited");
  });

  it("triggers favorite mutation on unFavorite click", () => {
    render(
      <MockedProvider>
        <FavoriteButton {...props} />
      </MockedProvider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(favoriteSpy).toHaveBeenCalledWith({ variables: { id: mockId } });
  });

  it("triggers unFavorite mutation on favorite click", () => {
    render(
      <MockedProvider>
        <FavoriteButton {...props} isFavorite />
      </MockedProvider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(unFavoriteSpy).toHaveBeenCalledWith({ variables: { id: mockId } });
  });
});
