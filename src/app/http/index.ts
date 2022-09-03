import Axios, { AxiosInstance } from "axios";

export const HttpClient: AxiosInstance = Axios.create({
  baseURL: "http://localhost:8080/",
});
