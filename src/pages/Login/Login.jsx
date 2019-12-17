import React, { useState, Fragment } from "react";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../../layout/layout.scss";
import "../../App.scss";
import { InputText } from "primereact/inputtext";
import { Row, Alert } from "reactstrap";
import { Button } from "primereact/button";
import { Button as AntButton } from "antd";
import { redirect } from "../../utils/redirect";

const Login = props => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const autenticar = () => {
    props.logar(userName, password);
  };

  return (
    <Fragment>
      <Row className="my-3">
        <label>RF ou CPF</label>
        <InputText
          value={userName}
          placeholder="Insira seu RF ou CPF"
          id={"username"}
          type={"text"}
          style={{ width: "100%" }}
          onChange={e => setUserName(e.target.value)}
          autoComplete="off"
        />
      </Row>
      <Row className="my-3">
        <label>Senha</label>
        <InputText
          value={password}
          placeholder="Insira sua senha"
          id={"password"}
          type={"password"}
          style={{ width: "100%" }}
          required
          onChange={e => setPassword(e.target.value)}
          autoComplete="off"
        />
        <Button
          label="Acessar"
          disabled={password.length > 0 && userName.length > 0 ? false : true}
          style={{ width: "100%" }}
          className="mt-3"
          onClick={autenticar}
        />
        <div className="mt-2 w-100 d-flex justify-content-center">
          <AntButton
            type="link"
            size="small"
            onClick={e => redirect("#/esqueci-minha-senha/")}
          >
            Esqueci minha senha
          </AntButton>
        </div>
        <div className="mt-3 d-flex justify-content-center w-100">
          <Alert color="danger" isOpen={props.isInvalid}>
            Usuário e/ou senha inválidos.
          </Alert>
        </div>
      </Row>
    </Fragment>
  );
};

export default Login;
