import { useEffect, useMemo } from "react";
import { queryParams } from "@/types/appTypes.ts";
import { pushQueryState } from "@/lib/functions.ts";

export const useWindowSearchParams = (defaults: queryParams = {}) => {
  const params = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);

    for (const [key, value] of Object.entries(defaults)) {
      if (!searchParams.has(key)) {
        searchParams.set(key, value);
      }
    }

    return searchParams;
  }, [window?.location.search]);

  useEffect(() => {
    pushQueryState(params);
    // setSearchParams(params)
  }, []);

  return params;
};
