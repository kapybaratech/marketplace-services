import axios from "axios";
import { WoocommerceCredentials } from "./../interfaces/woocommerce";

export const getWoocommerceApi = (credentials: WoocommerceCredentials) => {
  return axios.create({
    baseURL: credentials.baseURL + "/wp-json/wc/v3",
    auth: {
      username: credentials.consumerKey,
      password: credentials.consumerSecret,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
};
