import {User} from "@/types/apiTypes.ts";

export type AuthTokenResponse = {
  access_token: string;
  refresh_token: string;
  id_token: string;
};

export type ApiAxiosErrorResponse = {
  status: number;
  data: ApiResponseError;
};

export type ValidationErrors = {
  [key: string]: string[];
};

type ErrorObject = {
  code: string;
  message: string;
  status: number;
};

export type ApiResponseError = {
  error: string | ErrorObject;
  error_description: string;
  message?: string;
  status: number;
};

export interface JwtDecoded {
  user: User;
}