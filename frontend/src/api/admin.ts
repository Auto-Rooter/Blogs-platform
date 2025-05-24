import axios from "./axios";

export const fetchAllUsers = async () => {
  const res = await axios.get("/api/admin/users");
  return res.data;
};

export const updateUserRole = async (id: string, role: string) => {
  return axios.patch(`/api/admin/users/${id}/role`, { role });
};

export const deleteUser = async (id: string) => {
  return axios.delete(`/api/admin/users/${id}`);
};
