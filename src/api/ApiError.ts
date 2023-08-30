import { AxiosError } from "axios";
import { ApiAxiosErrorResponse } from "@/types/responseTypes";

export default class ApiError extends Error {
  public code: number | null = null;
  public date: Date;
  public data: AxiosError | null;
  public errorMessage: string | null;
  public errorDescription: string | null;
  public validationErrors: Record<string, string> | null;

  constructor(error: AxiosError, message = "") {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    this.name = "ApiError";
    this.errorMessage = null;
    this.errorDescription = null;
    this.validationErrors = null;

    this.date = new Date();
    this.data = error;

    if (error?.response) {
      const { data } = error.response as ApiAxiosErrorResponse;

      this.code = error.response.status;

      if (typeof data.error === "object") {
        this.errorMessage = data.error?.message;
      } else if (typeof data.error === "string") {
        this.errorMessage = data.error;
      }

      if (data?.error_description) {
        this.errorDescription = data.error_description;
      }
    } else {
      this.errorMessage = "Api Unreachable";
    }
  }
}
