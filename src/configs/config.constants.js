export let API_URL;
export let SIGPAE_API_URL;
export let JWT_AUTH;
export let ALIAS_TOKEN;
export let SAFI_EQUIPAMENTOS_API_URL;

if (process.env.NODE_ENV === "production") {
  // This way we can pass params to static files. see Dockerfile.
  // when build default env is production
  API_URL = "API_URL_REPLACE_ME";
  SAFI_EQUIPAMENTOS_API_URL = "SAFI_EQUIPAMENTOS_URL_REPLACE_ME";
  JWT_AUTH = "API_URL_REPLACE_ME/api-token-auth/";
  //   USER_URL = "API_URL_REPLACE_ME/users/";
  //   API_MOCK = "API_MOCK_REPLACE_ME";
} else {
  API_URL = process.env.REACT_APP_API_URL;
  SIGPAE_API_URL = process.env.REACT_APP_SIGPAE_API_URL;
  SAFI_EQUIPAMENTOS_API_URL = process.env.REACT_APP_SAFI_EQUIPAMENTOS_API_URL;
  JWT_AUTH = `${API_URL}/api-token-auth/`;
  ALIAS_TOKEN = "TOKEN";
}

export const CALENDAR_PT = {
  firstDayOfWeek: 1,
  dayNames: [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ],
  dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
  dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
  monthNames: [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ],
  monthNamesShort: [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ],
  clear: "Limpar",
  today: "Hoje",
};

export const REFERENCIA_ENCERRAMENTO = {
  DATA_ASSINATURA: "DATA_ASSINATURA",
  DATA_ORDEM_INICIO: "DATA_ORDEM_INICIO",
};
