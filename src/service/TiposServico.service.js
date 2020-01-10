import api from "./Api";
import { getHeaderToken } from "./auth.service";
import CONFIG from "../configs/config.constants";

export const getTiposServicoLookup = () => {
    const AUTH_HEADER = {
        headers: getHeaderToken()
      };
    return api.get(`${CONFIG.API_URL}/tipos-servico/lookup/`, AUTH_HEADER).then(res => res.data)
}
