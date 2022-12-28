import axios from "axios";
import { JNTCredentials } from "interfaces/jnt";

export const getJntApi = (JNTCredentials: JNTCredentials) => {
  if (!JNTCredentials.accessToken) {
    throw new Error("Missing JNT Access Token");
  }
  if (!JNTCredentials.baseUrl) {
    throw new Error("Missing JNT BaseURL");
  }

  const client = axios.create({
    baseURL: JNTCredentials.baseUrl,
    headers: {
      Authorization: `JWT ${JNTCredentials.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return client;
};
