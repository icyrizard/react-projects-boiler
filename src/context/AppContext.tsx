import { createContext, MutableRefObject, useContext } from "react";
import { DaToastElement } from "@/components/Toast.tsx";

interface AppContextType {
  initialized: boolean;
  contentRef: MutableRefObject<HTMLDivElement | null> | null;
  toast: MutableRefObject<DaToastElement | null> | null;
  setInitialized: (isInitialized: boolean) => void;
}

export function useApp() {
  return useContext(AppContext);
}

export const AppContext = createContext({
  initialized: false,
  contentRef: null,
  toast: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setInitialized: () => {},
} as AppContextType);
