const INITIAL_STATE = {};

const visualizarContratoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ONE_CONTRATO":
      return action;
    default:
      return state;
  }
};

export default visualizarContratoReducer;
