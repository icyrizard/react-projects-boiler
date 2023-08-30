import BaseApi from "./_baseApi";
import ApiError from "@/api/ApiError.ts";
import { AxiosError } from "axios";
import { AuthorizedStructuresResponse } from "@/types/responseTypes.ts";

export default class Auth extends BaseApi {
  async getAuthToken(data) {
    try {
      return await this.doRequest({
        data: data,
        method: "post",
        url: "/auth/oauth2.0/v1/token",
        baseURL: import.meta.env.VITE_OAUTH_BASE_URL,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(error);
      } else {
        throw error;
      }
    }
  }

  async getStructuredAuthorizedGroups(): Promise<AuthorizedStructuresResponse> {
    try {
      return await this.doRequest({
        method: "get",
        url: "/structure/authorized",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(error);
      } else {
        throw error;
      }
    }
  }

  async getUserInfo() {
    try {
      return await this.doRequest({
        method: "get",
        baseURL: import.meta.env.VITE_OAUTH_BASE_URL,
        url: "/auth/oauth2.0/v1/userinfo",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(error);
      } else {
        throw error;
      }
    }
  }
}
