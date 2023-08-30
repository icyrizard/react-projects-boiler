import { createContext, useContext } from "react";

import { DaUser } from "@/types/appTypes.ts";

export type setIdTokenFunction = (jwt: string | null) => void;

export type JwtRecordType = {
  jwt: string | null;
  refreshJwt: string | null;
};

export type SetJwtFunction = (jwtRecord: JwtRecordType | null) => void;

export type AuthContextType = {
  jwt: string | null;
  user: DaUser | null;
  setIdToken: setIdTokenFunction;
  setJwt: SetJwtFunction;
  setUser: (user: DaUser | null) => void;
};

export const AuthContext = createContext({
  jwt: null,
  user: null,
  setUser: () => {
    return;
  },
  setIdToken: (jwt) => {
    return jwt;
  },
  setJwt: (jwt) => {
    return jwt;
  },
} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}
