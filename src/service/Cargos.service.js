import api from "./Api";
import { getHeaderToken } from "./auth.service";

export const getCargosCoad = async () => {
  const AUTH_HEADER = {
    headers: getHeaderToken(),
  };
  const url = "coad/";
  return (await api.get(url, AUTH_HEADER)).data[0];
};
