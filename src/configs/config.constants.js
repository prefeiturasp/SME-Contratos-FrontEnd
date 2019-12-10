let API_URL = process.env.REACT_APP_API_URL;
let JWT_AUTH = `${API_URL}/api-token-auth/`;
let ALIAS_TOKEN = "TOKEN";

if (process.env.NODE_ENV === "production") {
  // This way we can pass params to static files. see Dockerfile.
  // when build default env is production
  API_URL = "API_URL_REPLACE_ME";
  JWT_AUTH = "API_URL_REPLACE_ME/api-token-auth/";
  //   USER_URL = "API_URL_REPLACE_ME/users/";
  //   API_MOCK = "API_MOCK_REPLACE_ME";
}

let CALENDAR_PT = {
  firstDayOfWeek: 1,
  dayNames: [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado"
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
    "dezembro"
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
    "dez"
  ],
  clear: "Limpar",
  today: "Hoje"
};

module.exports = {
  API_URL: API_URL,
  JWT_AUTH: JWT_AUTH,
  ALIAS_TOKEN: ALIAS_TOKEN,
  CALENDAR_PT: CALENDAR_PT
};
