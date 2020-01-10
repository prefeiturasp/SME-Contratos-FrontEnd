import React, { useState, Fragment } from "react";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../../layout/layout.scss";
import "../../App.scss";
import { InputText } from "primereact/inputtext";
import { Row, Alert, Col } from "reactstrap";
import { Button } from "primereact/button";
import { Button as AntButton } from "antd";
import { hasFlashMessage, getFlashMessage } from "../../utils/flashMessages";

const Login = props => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const autenticar = () => {
    props.logar(userName, password);
  };

  return (
    <Fragment>
      <Row className="my-3">
        <Col xl={12} md={12}>
          <label>Usuário</label>
          <InputText
            value={userName}
            placeholder="Insira seu Usuário"
            id={"username"}
            type={"text"}
            style={{ width: "100%" }}
            onChange={e => setUserName(e.target.value)}
            autoComplete="off"
          />
        </Col>
        <Col xl={12} md={12}>
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
        </Col>
        <Col xl={12} md={12}>
          <Button
            label="Acessar"
            disabled={password.length > 0 && userName.length > 0 ? false : true}
            style={{ width: "100%" }}
            className="mt-4"
            onClick={autenticar}
          />
        </Col>
        <Col xl={12} md={12}>
          <div className="mt-4 w-100 d-flex justify-content-center">
            <AntButton
              type="link"
              size="small"
              onClick={() => props.ativaEsqueciSenha()}
            >
              Esqueci minha senha
            </AntButton>
          </div>
        </Col>
        <Col xl={12} md={12}>
          <div className="mt-3 d-flex justify-content-center w-100">
            <Alert
              color="danger"
              isOpen={props.isInvalid}
              className="w-100 text-center"
            >
              {props.mensagem}
            </Alert>
            {hasFlashMessage("ERROR") ? (
              <Alert
                className="w-100 text-center font-weight-bold"
                color="danger"
              >
                {getFlashMessage("ERROR")}
              </Alert>
            ) : null}
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Login;
