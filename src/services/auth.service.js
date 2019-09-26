import decode from "jwt-decode";
import CONFIG from "../configs/config.constants";

export const TOKEN_ALIAS = "TOKEN";
export const TOKEN_TEMP = "TEMP";
export const STATUS_OK = 200;
export const STATUS_ERROR = 400;
export const STATUS_UNAUTHORIZED = 401;

export const login = async (username, password) => {
  try {
    const response = await fetch(CONFIG.JWT_AUTH, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    if (validaResposta(response.status)) {
      const json = await response.json();
      if (validarToken(json.token)) {
        localStorage.setItem(TOKEN_ALIAS, json.token);
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

const primeiroAcesso = async username => {
  try {
    const response = await fetch(
      `${CONFIG.API_URL}/usuarios/${username}/primeiro-acesso/`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return false;
  }
};

const validaResposta = status => {
  if (status === STATUS_OK) {
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  if (localStorage.getItem(TOKEN_ALIAS)) {
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_ALIAS);
  window.location.reload();
};

const validarToken = token => {
  const decoded = decode(token);
  if (decoded.username === undefined) return false;
  if (decoded.email === undefined) return false;
  localStorage.setItem(TOKEN_TEMP, token);
  return validarPrimeiroAcesso(decoded.username);
};

const validarPrimeiroAcesso = username => {
  primeiroAcesso(username).then(response => {
    if(response.alterar){
      return false
    }else{
      return true
    }
  });
};
