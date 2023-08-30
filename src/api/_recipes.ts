import BaseApi from "./_baseApi";
import {ListResponse, Recipe} from "@/types/apiTypes.ts";

export default class Recipes extends BaseApi {
  findMany(
    params: URLSearchParams | Record<string, string>,
  ): Promise<ListResponse<Recipe>> {
    let queryParams = params;

    if (params instanceof URLSearchParams) {
      queryParams = Object.fromEntries(params);
    }

    return this.doRequest({
      method: "get",
      url: "recipes/",
      params: queryParams,
    });
  }
}
