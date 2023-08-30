import axios from "axios";
import { ReactNode } from "react";

import { useAuth } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";
import ApiInstance from "@/api";
import { useApp } from "@/context/AppContext.tsx";
import { useTranslation } from "react-i18next";

export type AxiosProviderProps = {
  children?: ReactNode;
};

export function AxiosProvider({ children }: AxiosProviderProps) {
  const { toast } = useApp();
  const { t } = useTranslation();
  const { jwt, setUser, setJwt } = useAuth();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  // Set the AUTH token for any request
  axiosInstance.interceptors.request.use(
    (config) => {
      if (jwt && config?.headers) {
        config.headers["Authorization"] = `Bearer ${jwt}`;
      }

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error?.response?.status === 401) {
        if (
          error?.response?.data?.error?.code === "AUTH.EXPIRED" ||
          error?.response?.data?.error === "invalid_token"
        ) {
          setJwt(null);
          setUser(null);

          toast?.current?.error({
            message: t("common.session_expired").toString(),
          });
        }
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  const apiInstance = ApiInstance(axiosInstance);

  return (
    <AxiosContext.Provider value={{ axiosInstance, apiInstance }}>
      {children}
    </AxiosContext.Provider>
  );
}
