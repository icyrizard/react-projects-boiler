import { AxiosInstance } from "axios";
import Auth from "@/api/_auth.ts";
import Recipes  from "./_recipes.ts";

export const apiObject = {
  auth: new Auth(),
  users: new Recipes(),
};

export default function ApiInstance(
  axiosInstance: AxiosInstance,
): typeof apiObject {
  for (const [_, value] of Object.entries(apiObject)) {
    value.axiosInstance = axiosInstance;
  }

  return apiObject;
}
