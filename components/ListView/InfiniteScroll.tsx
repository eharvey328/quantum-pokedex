import { InView } from "react-intersection-observer";

import styles from "./ListView.module.scss";

export interface InfiniteScrollProps {
  loadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  showEndMessage: boolean;
}

export const InfiniteScroll = ({
  loadMore,
  loading,
  hasMore,
  showEndMessage,
}: InfiniteScrollProps) => {
  if (loading) {
    return <p className={styles.infinite_scroll_container}>Loading more...</p>;
  }

  if (hasMore) {
    return (
      <InView
        rootMargin="200px 0px"
        onChange={(inView) => {
          if (inView) loadMore();
        }}
      />
    );
  }

  if (showEndMessage) {
    return (
      <p className={styles.infinite_scroll_container}>
        You&apos;ve reached the end of the list.
      </p>
    );
  }

  return null;
};
