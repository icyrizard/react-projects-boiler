import { useEffect, useRef } from "react";

export const useRunOnce = (fn: () => void, deps = []) => {
  const triggered = useRef<boolean>(false);

  useEffect(() => {
    if (!triggered.current) {
      triggered.current = true;

      fn();
    }
  }, [triggered?.current, deps]);
};
