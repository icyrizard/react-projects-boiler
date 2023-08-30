import { createContext, useContext } from "react";
import { AxiosInstance } from "axios";
import { apiObject } from "@/api";

export type AxiosContextType = {
  axiosInstance: null | AxiosInstance;
  apiInstance: null | typeof apiObject;
};

export const AxiosContext = createContext({
  axiosInstance: null,
  apiInstance: null,
} as AxiosContextType);

export function useApi() {
  return useContext(AxiosContext);
}
