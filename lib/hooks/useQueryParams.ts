import { useRouter } from "next/router";
import { useMemo, useCallback } from "react";

export function useQueryParam(key: string) {
  const router = useRouter();

  const getValue = useCallback((): string | null => {
    if (typeof window === "undefined") {
      // Not available in an SSR context
      return null;
    }
    const query = new URLSearchParams(window.location.search);
    const value = query.get(key);
    return value !== null ? value : null;
  }, [key]);

  // Update the state value only when the relevant key changes.
  // Because we're not calling getValue in the function argument
  // of React.useMemo, but instead using it as the function to call,
  // there is no need to pass it in the dependency array.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(getValue, [router.query[key]]);

  return value ?? null;
}
