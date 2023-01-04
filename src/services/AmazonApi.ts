import axios, { AxiosInstance } from "axios";
import { aws4Interceptor } from "aws4-axios";

export const getAmazonApi = (
  access_key: string,
  secret_key: string
): AxiosInstance => {
  const client = axios.create({
    baseURL: "https://sellingpartnerapi-fe.amazon.com",

    validateStatus: (status) => status >= 200 && status < 500,
  });

  const interceptor = aws4Interceptor(
    {
      region: "us-west-2",
      service: "execute-api",
    },
    {
      accessKeyId: access_key,
      secretAccessKey: secret_key,
    }
  );

  client.interceptors.request.use(interceptor);

  return client;
};
