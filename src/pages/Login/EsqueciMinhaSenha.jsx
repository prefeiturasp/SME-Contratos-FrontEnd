import React, { useState, Fragment } from "react";
import { Row, Button as ButtonBootstrap } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { redirect } from "../../utils/redirect";
import "./style.scss";

const EsqueciSenha = props => {
  const [usuario, setUsuario] = useState("");

  return (
    <Fragment>
      <Row>
        <h3 className="mt-4 w-100 text-center" style={{ fontWeight: "bold" }}>
          Recuperação de Senha
        </h3>
        <p className="mt-4 text-center">
          {" "}
          Informe seu usuário abaixo, ao continuar você receberá um e-mail com
          as orientações para redefinição da sua senha.
        </p>
      </Row>
      <Row className="my-3 mx-4">
        <label>Usuário</label>
        <InputText
          value={usuario}
          placeholder="Insira seu Usuário"
          id={"usuario"}
          type={"text"}
          style={{ width: "100%" }}
          onChange={e => setUsuario(e.target.value)}
          autoComplete="off"
        />
        <span className="w-100 mt-3 d-flex justify-content-end">
          <ButtonBootstrap
            onClick={() => redirect("/")}
            className="btn-coad-blue mr-2"
          >
            <i className="fas fa-arrow-left" /> Voltar
          </ButtonBootstrap>
          <Button
            className="btn-coad-primary"
            label="Continuar"
            onClick={() => props.solicitaRedefinicaoSenha(usuario)}
          />
        </span>
      </Row>
    </Fragment>
  );
};

export default EsqueciSenha;
