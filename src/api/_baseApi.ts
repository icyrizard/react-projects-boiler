import { AxiosInstance, AxiosRequestConfig } from "axios";

export default class BaseApi {
  _axiosInstance: AxiosInstance | undefined;

  set axiosInstance(value: AxiosInstance) {
    this._axiosInstance = value;
  }

  async doRequest(params: AxiosRequestConfig) {
    const { data } = await this._axiosInstance!(params);
    return data;
  }
}
