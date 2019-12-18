import decode from "jwt-decode";
import CONFIG from "../configs/config.constants";
import { redirect } from "../utils/redirect";

export const TOKEN_ALIAS = "TOKEN";
export const USERNAME_TEMP = "USERNAME_TEMP";
export const STATUS_OK = 200;
export const STATUS_ERROR = 400;
export const STATUS_UNAUTHORIZED = 401;

const authHeader = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

export const login = async (username, password) => {
  try {
    const OBJ_REQUEST = {
      headers: authHeader,
      method: "POST",
      body: JSON.stringify({ username, password })
    };
    const response = await fetch(CONFIG.JWT_AUTH, OBJ_REQUEST);
    if (validaResposta(response.status)) {
      const json = await response.json();
      if (validarToken(json.token)) {
        localStorage.setItem(TOKEN_ALIAS, json.token);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log("Error ao tentar logar: ", error);
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

export const trocarSenha = async (password, password2) => {
  try {
    const username = localStorage.getItem(USERNAME_TEMP);
    const OBJ_REQUEST = {
      headers: authHeader,
      method: "PATCH",
      body: JSON.stringify({ username, password, password2 })
    };
    const response = await fetch(
      `${CONFIG.API_URL}/usuarios/${username}/troca-senha/`,
      OBJ_REQUEST
    );
    const json = await response.json();
    return json;
  } catch (error) {
    return false;
  }
};

export const esqueciMinhaSenha = async username => {
  try {
    const OBJ_REQUEST = {
      headers: authHeader,
      method: "PATCH",
      body: JSON.stringify({ username })
    };
    const response = await fetch(
      `${CONFIG.API_URL}/esqueci-minha-senha/${username}/`,
      OBJ_REQUEST
    );
    const json = await response
    return json
  } catch (error) {
    return false;
  }
};

export const redefinirSenha = async (password, password2, hash_redefinicao) => {
  try {
    const OBJ_REQUEST = {
      headers: authHeader,
      method: "POST",
      body: JSON.stringify({ hash_redefinicao, password, password2 })
    };
    const response = await fetch(
      `${CONFIG.API_URL}/redefinir-senha/`,
      OBJ_REQUEST
    );
    const json = await response.json();
    return { status: response.status, detail: json.detail };
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

export const getToken = () => localStorage.getItem(TOKEN_ALIAS);

export const getUsuario = () => {
  const token = localStorage.getItem(TOKEN_ALIAS);
  const usuario = decode(token);
  return usuario;
};

export const getHeaderToken = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `JWT ${getToken()}`
});

export const isPrimeiroAcesso = () => {
  if (localStorage.getItem(USERNAME_TEMP)) {
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
  return true;
};

export const validarPrimeiroAcesso = () => {
  const decoded = decode(localStorage.getItem(TOKEN_ALIAS));
  const username = decoded.username;                          
  primeiroAcesso(username).then(response => {
    if (response.alterar) {
      localStorage.removeItem(TOKEN_ALIAS);
      localStorage.setItem(USERNAME_TEMP, username);
      redirect("/#/primeiro-acesso")
    }
  });
};

export const removerUsernameTemp = () => {
  localStorage.removeItem(USERNAME_TEMP);
};
