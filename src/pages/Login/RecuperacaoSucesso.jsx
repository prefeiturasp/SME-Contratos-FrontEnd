import React, { Fragment } from "react";
import { Button } from "primereact/button";
import { redirect } from "../../utils/redirect";

const RecuperacaoSucesso = props => {
  return (
    <Fragment>
      <h3 className="my-4 w-100 text-center" style={{ fontWeight: "bold" }}>
        Recuperação de Senha
      </h3>
      <div className="w-100 d-flex justify-content-center">
        <div className="div-circular-verde">
          <i className="fas fa-check fa-3x check-verde" />
        </div>
      </div>
      <div className="mt-4 mx-5 text-center">
        <p className="texto-simples-verde mt-1 mb-3">
          {`Seu link de recuperação de senha foi enviado para
            ${props.email}`}
        </p>
        <p className="texto-simples-verde mt-2">
          Verifique sua caixa de entrada!
        </p>
      </div>
      <span className="w-100 mt-3 d-flex justify-content-center">
        <Button
          className="btn-coad-primary w-50"
          label="Continuar"
          onClick={() => redirect("/")}
        />
      </span>
    </Fragment>
  );
};

export default RecuperacaoSucesso;
