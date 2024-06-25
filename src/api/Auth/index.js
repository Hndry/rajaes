import api from "../config";

export const login = async (input) => {
  const response = await api.post("/auth/access-token", input);

  return response;
};
