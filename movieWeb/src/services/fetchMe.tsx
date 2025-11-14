import axiosInstance from "../api/axiosInstance";

export const fetchMe = async () => {
  const res = await axiosInstance.get("/users/me");
  return res.data.data;
};
