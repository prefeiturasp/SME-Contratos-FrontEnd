import React from "react";
import {Field, ErrorMessage} from 'formik'

const Teste2 = props => {
  return (
    <div className="form-group">
      <label htmlFor="lastName">Sobrenome</label>
      <Field
        className="form-control"
        name="lastName"
        placeholder="Digite seu sobrenome"
        id="lastName"
        type="text"
      />
      <ErrorMessage className="valid-feedback" name="lastName" />
    </div>
  );
};

export default Teste2;
