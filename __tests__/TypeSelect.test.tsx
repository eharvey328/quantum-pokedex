import { MockedProvider } from "@apollo/client/testing";
import { PokemonTypesQuery, TypeSelect } from "@components/ListView/TypeSelect";
import { fireEvent, render, screen } from "@testing-library/react";

describe("TypeSelect", () => {
  const mockOnChange = jest.fn();
  const mockValue = "Grass";
  const mockData = [
    {
      request: {
        query: PokemonTypesQuery,
      },
      result: {
        data: { pokemonTypes: ["Grass", "Fire"] },
      },
    },
  ];

  it("renders on init", () => {
    render(
      <MockedProvider mocks={mockData} addTypename={false}>
        <TypeSelect value="" onChange={mockOnChange} />
      </MockedProvider>
    );
    const select = screen.getByPlaceholderText(/type/i);
    fireEvent.click(select);
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveTextContent(/type/i);
  });

  it("renders with default value", async () => {
    render(
      <MockedProvider mocks={mockData} addTypename={false}>
        <TypeSelect value={mockValue} onChange={mockOnChange} />
      </MockedProvider>
    );
    await screen.findByText(/grass/i, { selector: "button" });
  });

  it("renders with loading as only option", async () => {
    render(
      <MockedProvider mocks={mockData} addTypename={false}>
        <TypeSelect value={mockValue} onChange={mockOnChange} />
      </MockedProvider>
    );
    const select = screen.getByPlaceholderText(/type/i);
    fireEvent.click(select);
    const options = await screen.findAllByRole("option");
    expect(options.length).toEqual(2); // loading + default option
    expect(options[1]).toHaveTextContent(/loading.../i);
  });

  it("fires onChange on option click", async () => {
    render(
      <MockedProvider mocks={mockData} addTypename={false}>
        <TypeSelect value={mockValue} onChange={mockOnChange} />
      </MockedProvider>
    );
    const select = await screen.findByText(/grass/i, { selector: "button" });
    fireEvent.click(select);
    const options = await screen.findAllByRole("option");
    fireEvent.click(options[2]);
    expect(mockOnChange).toHaveBeenCalledWith("Fire");
  });
});
