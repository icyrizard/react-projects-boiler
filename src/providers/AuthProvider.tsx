import { useEffect, useState } from "react";

import { AuthContext, JwtRecordType } from "@/context/AuthContext";
import {User} from "@/types/apiTypes.ts";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);

  const setIdToken = (jwt: string | null) => {
    if (jwt) {
      localStorage.setItem("@theme:idToken", jwt);
    } else {
      localStorage.removeItem("@theme:idToken");
    }
  };

  const setJwtCb = (jwtRecord: JwtRecordType | null) => {
    const { jwt = null, refreshJwt = null } = jwtRecord || {};

    setJwt(jwt ?? null);

    if (jwt) {
      localStorage.setItem("@theme:jwt", jwt);
    } else {
      localStorage.removeItem("@theme:jwt");
    }

    if (refreshJwt) {
      localStorage.setItem("@theme:refreshJwt", refreshJwt);
    } else {
      localStorage.removeItem("@theme:refreshJwt");
    }
  };

  const init = async () => {
    const jwt = localStorage.getItem("@theme:jwt") || null;
    const refreshJwt = localStorage.getItem("@theme:refreshJwt") || null;

    setJwtCb({ jwt, refreshJwt });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{ setUser, jwt, setJwt: setJwtCb, setIdToken, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
