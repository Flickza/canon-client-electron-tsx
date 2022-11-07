import axios from "axios";
const baseURL = "http://10.170.8.154:7373";

export const apiRequest = async (
  method: string | undefined,
  url: string | undefined,
  params?: { [key: string]: string }
) => {
  /* Checking if the baseURL is defined. If it is not defined, it will return an error. */
  if (!baseURL || !method || !url)
    return new Error("No baseURL or method/url specified");

  /* Logging the method and url to the console. */
  console.log(method, url);

  /* Using the axios library to make a request to the baseURL and the url. */
  return axios(`${baseURL}${url}`, { method: method, params: params });
};
