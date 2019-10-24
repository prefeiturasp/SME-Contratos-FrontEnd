import React, { Component } from "react";
import Row from "../../components/Global/Row";
import bg from "../../assets/images/bg.svg";
import logoSP from "../../assets/images/logoSP.svg";
import logoSME from "../../assets/images/logoSME.svg";
import Grid from "../../components/Global/Grid";
import { Button, Form, Alert, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { InputLabel } from "../../components/Global/InputLabel";
import "./style.scss";
import { login } from "../../service/auth.service";
import { getParams } from "./helpers";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerta: false,
      mensagem: false
    };
  }

  componentDidMount() {
    let mostraMensagem = getParams("msg");
    if (mostraMensagem) {
      this.setState({ mensagem: true });
    }
  }

  submit = values => {
    const { username, password } = values;
    login(username, password).then(resposta => {
      if (resposta) {
        console.log(resposta);
        window.location.href = "/";
      } else {
        this.setState({ alerta: true });
      }
    });
  };

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const { alerta, mensagem } = this.state;
    return (
      <div>
        <Row>
          <div className="col d-none d-lg-block">
            <img alt="img" height="70%" width="100%" src={bg} />
          </div>
          <div className="col">
            <Row centralizar={true} classe={"pt-5 block-logo d-inline-block"}>
              <Grid cols={"2 2 2 2"} classe={"d-flex flex-row-reverse ml-5-2"}>
                <img height={"65"} alt="logo-sme" src={logoSME} />
              </Grid>
              <Grid cols={"2 2 2 4"} classe={"mr-5"}>
                <h5>Novo sistema de Gestão de Contratos</h5>
              </Grid>
            </Row>
            <Row centralizar={true} classe={"w-100"}>
              <Col>
                <Alert color="success" isOpen={mensagem}>
                  Sua senha foi validada com sucesso.
                </Alert>
              </Col>
            </Row>
            <Row centralizar={true} classe={"w-75 pb-3 ml-5-2"}>
              <Grid cols={"1 4 4 8"}>
                <Form onSubmit={handleSubmit(this.submit)}>
                  <Field
                    component={InputLabel}
                    label={"RF ou CPF"}
                    id={"username"}
                    type={"text"}
                    autoComplete={"Off"}
                    placeholder={"Insira seu RF ou CPF"}
                    name={"username"}
                    />
                  <Field
                    component={InputLabel}
                    autoComplete={"Off"}
                    label={"Senha"}
                    id={"senha"}
                    type="password"
                    placeholder={"Insira sua senha"}
                    name={"password"}
                    />
                  <div className="pb-4 d-flex justify-content-end">
                    <NavLink to="/esqueci-minha-senha" className="link">Esqueci minha senha</NavLink>
                  </div>
                  <div className="pb-4 d-flex justify-content-center">
                    <Alert color="danger" isOpen={alerta}>
                      Usuário e/ou senha inválidos.
                    </Alert>
                  </div>

                  <Button
                    type={"submit"}
                    color="secondary bt-login"
                    size="lg"
                    disabled={pristine || submitting}
                    block
                    >
                    Acessar
                  </Button>
                  <div className="pt-3 d-flex justify-content-center">
                    <NavLink to="#" className="link">Ainda não sou cadastrado</NavLink>
                  </div>
                </Form>
              </Grid>
            </Row>
            <Row centralizar={true} classe={"mt-4"}>
              <img alt="img" src={logoSP} />
            </Row>
          </div>
        </Row>
        </div>
    );
  }
}

Login = reduxForm({
  form: "login",
  destroyOnUnmount: false
})(Login);

export default Login;
