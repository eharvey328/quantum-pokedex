import { SearchInput } from "@components/ListView/SearchInput";
import { fireEvent, render, screen } from "@testing-library/react";

describe("SearchInput", () => {
  const mockOnChange = jest.fn();
  const mockValue = "test";

  afterEach(() => {
    mockOnChange.mockClear();
  });

  it("renders on init", () => {
    render(<SearchInput onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("renders with default value", () => {
    render(<SearchInput defaultValue={mockValue} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue(mockValue);
  });

  it("triggers onChange on Enter key press", () => {
    render(<SearchInput onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: mockValue } });
    fireEvent.keyUp(input, { key: `Enter` });
    expect(mockOnChange).toHaveBeenCalledWith(mockValue);
  });

  it("does not trigger onChange on non Enter key press", () => {
    render(<SearchInput onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: mockValue } });
    fireEvent.keyUp(input, { key: `d` });
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("clears input and fires onChange on clear button click", () => {
    render(<SearchInput defaultValue={mockValue} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue(mockValue);
    const clear = screen.getByRole("button");
    fireEvent.click(clear);
    expect(input).toHaveValue("");
    expect(mockOnChange).toHaveBeenCalledWith("");
  });
});
