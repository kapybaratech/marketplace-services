import Axios, { AxiosInstance } from "axios";
import { createHmac } from "crypto";
import { LazadaCredentials } from "interfaces/lazada";

const baseURL = "https://api.lazada.sg/rest";

const appendCommonParams = async (
  params: { [key: string]: any },
  path: string,
  credentials: LazadaCredentials
) => {
  if (!credentials.app_secret) {
    throw Error("Lazada app secret is not set");
  }
  if (!credentials.app_key) {
    throw Error("Lazada app key is not set");
  }
  const { app_key, app_secret } = credentials;

  const timestamp = Date.now().toString();
  const sign_method = "sha256";
  params = {
    ...params,
    access_token: credentials.access_token,
    app_key,
    timestamp,
    sign_method,
  };

  let baseString = Object.keys(params)
    .sort()
    .reduce((toSign, curr) => toSign + curr + params[curr], "");
  baseString = path + baseString;
  const sign = createHmac("sha256", app_secret)
    .update(baseString)
    .digest("hex")
    .toUpperCase();
  params.sign = sign;
  return params;
};

export const getLazadaApi = (credentials: LazadaCredentials) => {
  let LazadaApi: AxiosInstance;
  try {
    LazadaApi = Axios.create({
      baseURL,
    });
    LazadaApi.defaults.params = {};
  } catch (error) {
    throw error;
  }
  LazadaApi.interceptors.request.use(
    async function (config) {
      if (!config.url) throw Error("URL is not set");
      config.params = await appendCommonParams(
        config.params,
        config.url,
        credentials
      );
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return LazadaApi;
};
