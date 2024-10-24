import axios from "axios";
import { HOST_API } from "../../config";

export const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    Accept: "application/json",
  },
});
