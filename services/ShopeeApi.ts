import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { createHmac } from "crypto";
import { ShopeeCredentials } from "interfaces/shopee";

const baseURL = "https://partner.shopeemobile.com";

export const getShopeeApi = (credentials: ShopeeCredentials) => {
  let ShopeeApi: AxiosInstance;
  if (!credentials.partner_id || !credentials.partner_key) {
    throw Error("Partner id or partner key is missing from credentials");
  }
  const { partner_id, partner_key } = credentials;
  ShopeeApi = Axios.create({
    baseURL,
  });
  ShopeeApi.defaults.params = {};
  ShopeeApi.defaults.params.partner_id = parseInt(partner_id);

  const initCommonData = (config: AxiosRequestConfig) => {
    config.params.access_token = credentials.access_token;
    config.params.shop_id = parseInt(credentials.shop_id as unknown as string);

    const timestamp = Math.floor(Date.now() / 1000);
    config.params.timestamp = timestamp;
    const baseString =
      config.params.partner_id +
      config.url +
      timestamp +
      config.params.access_token +
      config.params.shop_id;
    const sign = createHmac("sha256", partner_key)
      .update(baseString)
      .digest("hex");
    config.params.sign = sign;

    return config;
  };

  ShopeeApi.interceptors.request.use(
    async function (config) {
      return initCommonData(config);
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return ShopeeApi;
};
