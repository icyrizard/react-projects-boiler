import ApiError from "./ApiError";
import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export const doRequest = async (
  axiosInstance: AxiosInstance,
  params: AxiosRequestConfig,
) => {
  try {
    const { data } = await axiosInstance(params);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiError(error);
    } else {
      throw error;
    }
  }
};
