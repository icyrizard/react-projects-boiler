import {ReactNode, useEffect, useRef} from "react";
import {BootstrapContext} from "@/context/BootstrapContext";
import {useApi} from "@/context/AxiosContext.tsx";
import {useApp} from "@/context/AppContext";
import {useAuth} from "@/context/AuthContext";

export type AxiosProviderProps = {
  children?: ReactNode;
};

function useDoRefreshToken() {
  const { setJwt } = useAuth();

  async function doRefreshToken() {
  }

  return {
    doRefreshToken,
  };
}

export function BootstrapProvider({ children }: AxiosProviderProps) {
  const { apiInstance } = useApi();
  const { setUser, setJwt, user, setIdToken, jwt } = useAuth();
  const { setInitialized, initialized } = useApp();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { doRefreshToken } = useDoRefreshToken();

  useEffect(() => {
    if (jwt && !user) {
      const bootstrap = async () => {
        // if (
        //   !intervalRef.current &&
        //   localStorage.getItem("@theme:refreshJwt")
        // ) {
        //   // every half hour
        //   intervalRef.current = setInterval(doRefreshToken, 1800000);
        // }
      };

      bootstrap();
    } else if (
      !localStorage.getItem("@theme:jwt") ||
      !localStorage.getItem("@theme:refreshJwt")
    ) {
      setInitialized(true);

      // make sure we're fully logged out.
      setIdToken(null);
      setJwt(null);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (
        intervalRef.current &&
        (!localStorage.getItem("@theme:jwt") ||
          !localStorage.getItem("@theme:refreshJwt"))
      ) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [setIdToken, initialized, user, jwt]);

  return (
    <BootstrapContext.Provider value={{}}>{children}</BootstrapContext.Provider>
  );
}
