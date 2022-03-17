import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import visualizarContratoReducer from "./modules/contrato/visualizarContrato.reduce";

export default combineReducers({
  form: formReducer,
  visualizarContratoReducer,
});
