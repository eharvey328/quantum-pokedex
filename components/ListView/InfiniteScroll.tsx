import { InView } from "react-intersection-observer";

import styles from "./ListView.module.scss";

export interface InfiniteScrollProps {
  loadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  disable: boolean;
  error?: Error | null;
}

export const InfiniteScroll = ({
  loadMore,
  loading,
  hasMore,
  disable,
  error,
}: InfiniteScrollProps) => {
  if (disable) return null;
  if (error) {
    return (
      <p className={styles.infinite_scroll_container}>Unable to load more.</p>
    );
  }

  if (loading) {
    return <p className={styles.infinite_scroll_container}>Loading more...</p>;
  }

  if (hasMore) {
    return (
      <InView
        rootMargin="200px 0px"
        skip={disable}
        onChange={(inView) => {
          if (inView) loadMore();
        }}
      />
    );
  }

  return (
    <p className={styles.infinite_scroll_container}>
      You&apos;ve reached the end of the list.
    </p>
  );
};
