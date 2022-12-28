import axios from "axios";
import { aws4Interceptor } from "aws4-axios";
import { AmazonCredentials } from "interfaces/amazon";

export const getAmazonApi = (amazonCredentials: AmazonCredentials) => {
  if (!amazonCredentials.access_key) {
    throw Error("Amazon access key is not set");
  }
  if (!amazonCredentials.secret_key) {
    throw Error("Amazon secret key is not set");
  }
  const { access_key, secret_key } = amazonCredentials;

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
