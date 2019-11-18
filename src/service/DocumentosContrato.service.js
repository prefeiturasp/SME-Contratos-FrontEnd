import axios from "axios";
import { getHeaderToken } from "./auth.service";
import CONFIG from "../configs/config.constants";

export const getDocumentosFiscaisByContrato = (uuid) => {
    const AUTH_HEADER = {
        headers: getHeaderToken()
      };
    return axios.get(`${CONFIG.API_URL}/documentos-fiscais/?search=${uuid}`, AUTH_HEADER).then(res => res.data)
}
