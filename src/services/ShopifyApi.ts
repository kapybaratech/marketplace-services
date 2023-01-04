import axios from "axios";
import { ShopifyCredentials } from "./../interfaces/shopify";

export const getShopifyApi = (credentials: ShopifyCredentials) => {
  return axios.create({
    baseURL: credentials.baseURL,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": credentials.accessToken,
    },
  });
};
