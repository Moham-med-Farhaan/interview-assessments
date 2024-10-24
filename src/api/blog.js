import { axiosInstance } from "../utils/axios/path";

export async function addBlog(data) {
  const res = await axiosInstance.post("", data);
  return res;
}

export async function getBlogs() {
  const res = await axiosInstance.get();
  return res;
}
