import axios from "axios";
const baseURL = "http://10.170.8.154:7373";

export const apiRequest = async (method: string, url: string) => {
  if (!baseURL) return new Error("No baseURL specified");
  console.log(method, url);
  return await axios({
    method: method,
    url: `${baseURL}${url}`,
  });
};
