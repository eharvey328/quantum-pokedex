import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";

import HomePage from "pages/index";

describe("HomePage", () => {
  it("renders the heading", () => {
    render(
      <MockedProvider>
        <HomePage />
      </MockedProvider>
    );
    const heading = screen.getByRole("heading", { name: "Pokédex" });
    expect(heading).toBeInTheDocument();
  });
});
