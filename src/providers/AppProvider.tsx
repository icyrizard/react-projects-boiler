import { ReactNode, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ToastElement } from "@/components/Toast.tsx";

export type AxiosProviderProps = {
  children?: ReactNode;
};

export function AppProvider({ children }: AxiosProviderProps) {
  const [initialized, setInitialized] = useState<boolean>(false);

  // can be used to scroll to top of page
  const contentRef = useRef<HTMLDivElement | null>(null);
  const toast = useRef<ToastElement | null>(null);

  return (
    <AppContext.Provider
      value={{ initialized, setInitialized, contentRef, toast }}
    >
      {children}
    </AppContext.Provider>
  );
}
