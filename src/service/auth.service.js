import decode from "jwt-decode";
import CONFIG from "../configs/config.constants";
import axios from "axios";
import { setFlashMessage } from "../utils/flashMessages";
import { BAD_REQUEST, OK } from "http-status-codes";

export const TOKEN_ALIAS = "TOKEN";
export const USERNAME_TEMP = "USERNAME_TEMP";

const LIMITE_TEMPO_REFRESH_TOKEN = 10 * 60; // 10 minutos

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

export const trocarSenha = async (password, password2, username) => {
  try {
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
    const json = await response;
    return json;
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
  if (status === OK) {
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  if (localStorage.getItem(TOKEN_ALIAS)) {
    return true;
  }
  saveLocation()
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

const getTokenDecoded = () => {
  const token = getToken();
  return decode(token);
};

export const refreshToken = async () => {
  try {
    const AUTH_HEADER = {
      headers: getHeaderToken()
    };

    const payload = { token: getToken() };
    const response = await axios.post(
      `${CONFIG.API_URL}/api-token-refresh/`,
      payload,
      AUTH_HEADER
    );
    const newToken = response.data;
    replaceToken(newToken.token);
  } catch (error) {
    saveLocation();
    logout();
  }
};

export const verifyToken = async () => {
  try {
    const AUTH_HEADER = {
      headers: getHeaderToken()
    };

    const payload = { token: getToken() };
    const response = await axios.post(
      `${CONFIG.API_URL}/api-token-verify/`,
      payload,
      AUTH_HEADER
    );

    if (checkTimeLeft() <= LIMITE_TEMPO_REFRESH_TOKEN) {
      refreshToken();
    }
    return response;
  } catch (error) {
    validaMensagemException(error);
    saveLocation();
    logout();
  }
};

const validaMensagemException = error => {
  const response = error.response;
  if (response.status === BAD_REQUEST) {
    if (response.data.non_field_errors) {
      const mensagem = response.data.non_field_errors[0];
      setFlashMessage(mensagem, "ERROR");
    }
  }
};

const checkTimeLeft = () => {
  const token = getTokenDecoded();
  const dateToken = new Date(token.exp * 1000);
  const dateVerify = new Date(Date.now());
  const secondsLeft = (dateToken - dateVerify) / 1000;
  return secondsLeft;
};

const replaceToken = token => {
  localStorage.removeItem(TOKEN_ALIAS);
  localStorage.setItem(TOKEN_ALIAS, token);
};

export const saveLocation = () => {
  setFlashMessage(window.location.href, "HISTORY_URL");
};

const validarToken = token => {
  const decoded = decode(token);
  if (decoded.username === undefined) return false;
  if (decoded.email === undefined) return false;
  return true;
};

export const validarPrimeiroAcesso = async username => {
  const response = await primeiroAcesso(username);
  return response.alterar;
};

export const removerUsernameTemp = () => {
  localStorage.removeItem(USERNAME_TEMP);
};
