import React, { Fragment, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Row, Alert } from "reactstrap";

const RedefinirSenha = props => {
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");

  const HandleClickContinuar = () => {
    if (props.isPrimeiroAcesso) {
      props.primeiroAcesso(senha1, senha2);
    } else {
      props.redefineSenha(senha1, senha2);
    }
  };

  return (
    <Fragment>
      <h3 className="my-4 w-100 text-center" style={{ fontWeight: "bold" }}>
        {props.titulo}
      </h3>
      <div className="mt-4 mx-5 text-center">
        <Row className="my-3">
          <label>Nova Senha</label>
          <InputText
            value={senha1}
            placeholder="Insira a senha"
            id={"password1"}
            type={"password"}
            style={{ width: "100%" }}
            required
            onChange={e => setSenha1(e.target.value)}
          />
        </Row>
        <Row className="my-3">
          <label>Confirmação da Nova Senha</label>
          <InputText
            value={senha2}
            placeholder="Insira a senha novamente"
            id={"password2"}
            type={"password"}
            style={{ width: "100%" }}
            required
            onChange={e => setSenha2(e.target.value)}
          />
          <div className="mt-3 d-flex justify-content-center w-100">
            <Alert color="danger" isOpen={props.isInvalid} className="w-100">
              {props.mensagem}
            </Alert>
          </div>
        </Row>
      </div>
      <span className="w-100 mt-5 d-flex justify-content-center">
        <Button
          className="btn-coad-primary w-50"
          label="Continuar"
          onClick={HandleClickContinuar}
        />
      </span>
    </Fragment>
  );
};

export default RedefinirSenha;
