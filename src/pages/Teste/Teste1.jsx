import React from "react";
import {Field, ErrorMessage} from 'formik'

const Teste1 = props => {
  return (
    <div className="form-group">
      <label htmlFor="firstName">Sobrenome</label>
      <Field
        className="form-control"
        name="firstName"
        placeholder="Digite seu Nome"
        id="firstName"
        type="text"
      />
      <ErrorMessage className="valid-feedback" name="firstName" />
    </div>
  );
};

export default Teste1;
