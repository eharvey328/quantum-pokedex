import { render, screen } from "@testing-library/react";
import {
  InfiniteScroll,
  InfiniteScrollProps,
} from "@components/ListView/InfiniteScroll";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

describe("InfiniteScroll", () => {
  const props: InfiniteScrollProps = {
    loadMore: jest.fn(),
    loading: false,
    hasMore: false,
    disable: false,
  };

  it("renders empty message", async () => {
    render(<InfiniteScroll {...props} />);
    const message = await screen.findByText(
      "You've reached the end of the list."
    );
    expect(message).toBeInTheDocument();
  });

  it("renders nothing if disabled", () => {
    const { container } = render(<InfiniteScroll {...props} disable />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders error message", async () => {
    render(<InfiniteScroll {...props} error={new Error("test error")} />);
    const message = await screen.findByText("Unable to load more.");
    expect(message).toBeInTheDocument();
  });

  it("renders loading message", async () => {
    render(<InfiniteScroll {...props} loading />);
    const message = await screen.findByText("Loading more...");
    expect(message).toBeInTheDocument();
  });

  it("renders InView checker", async () => {
    render(<InfiniteScroll {...props} hasMore />);
    mockAllIsIntersecting(true);
    const inView = await screen.findByTestId("inview");
    expect(inView).toBeInTheDocument();
  });
});
