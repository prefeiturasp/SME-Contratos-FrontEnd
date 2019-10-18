import axios from "axios";
import { getHeaderToken } from "./auth.service";
import CONFIG from "../configs/config.constants";

export const getEmpresasLookup = () => {
    const AUTH_HEADER = {
        headers: getHeaderToken()
      };
    return axios.get(`${CONFIG.API_URL}/empresas/lookup/`, AUTH_HEADER).then(res => res.data)
}
