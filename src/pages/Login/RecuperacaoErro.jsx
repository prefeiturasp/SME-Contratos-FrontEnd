import React, { Fragment } from "react";
import { Button } from "primereact/button";
import { redirect } from "../../utils/redirect";

const RecuperacaoErro = props => {
  return (
    <Fragment>
      <h3 className="my-4 w-100 text-center" style={{ fontWeight: "bold" }}>
        Recuperação de Senha
      </h3>
      <div className="w-100 d-flex justify-content-center">
        <div className="div-circular-vermelho">
          <i className="fas fa-times fa-3x check-vermelho" />
        </div>
      </div>
      <div className="mt-4 mx-5 text-center">
        <p className="texto-simples-vermelho mt-3">
          Você não tem um e-mail cadastrado para recuperar sua senha.
        </p>
        <p className="texto-simples-vermelho mt-1 mb-5">
          Para restabelecer o seu acesso, procure o Diretor da sua unidade.
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

export default RecuperacaoErro;
