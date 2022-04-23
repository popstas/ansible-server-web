import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IncomingMessage } from "http";

type ConfigType = AxiosRequestConfig & {
  req?: IncomingMessage;
};

function send<T>(
  url: string,
  data: unknown = null,
  config: ConfigType = {},
  method: "get" | "post" = "get"
): Promise<AxiosResponse<T>> {
  // const req = config.req;
  // axios doesnt need that
  delete config.req;

  const origin = typeof window !== "undefined" ? window.origin : 'http://192.168.1.10:3000/'; // TODO: current origin
  url = `${origin}/api/${url}`;

  return method === "get"
    ? axios.get<T>(url, config)
    : axios.post<T>(url, data, config);
}

const api = {
  get: <T>(url: string, config?: ConfigType): Promise<AxiosResponse<T>> =>
    send<T>(url, null, config, "get"),
  post: <T>(
    url: string,
    data: unknown,
    config?: ConfigType
  ): Promise<AxiosResponse<T>> => send<T>(url, data, config, "post"),
};

declare global {
  interface Window {
    api?: typeof api;
  }
}

// api in browser for debugging
if (typeof window !== "undefined") {
  window.api = api;
}

export default api;
