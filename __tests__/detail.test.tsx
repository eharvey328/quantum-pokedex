import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";

import DetailPage from "pages/detail/[slug]";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("DetailPage", () => {
  it("renders empty message", () => {
    useRouter.mockReturnValueOnce({
      query: {},
      prefetch: jest.fn(),
    });
    render(
      <MockedProvider>
        <DetailPage />
      </MockedProvider>
    );
    const message = screen.getByText("Pokémon not foud");
    expect(message).toBeInTheDocument();
  });

  it("triggers prefetch of HomePage on init", () => {
    const mockPrefetch = jest.fn();
    useRouter.mockReturnValueOnce({
      query: {},
      prefetch: mockPrefetch,
    });
    render(
      <MockedProvider>
        <DetailPage />
      </MockedProvider>
    );
    expect(mockPrefetch).toHaveBeenCalledWith("/");
  });

  it("renders the back button", () => {
    useRouter.mockReturnValueOnce({
      query: { slug: "test" },
      prefetch: jest.fn(),
    });
    render(
      <MockedProvider>
        <DetailPage />
      </MockedProvider>
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});
