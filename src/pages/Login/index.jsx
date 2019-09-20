import React, { Component } from "react";
import Row from "../../components/Row";
import Container from "../../components/Container";
import bg from "../../assets/images/bg.svg";
import logoSP from "../../assets/images/logoSP.svg";
import logoSME from "../../assets/images/logoSME.svg";
import Grid from "../../components/Grid";
import { Button, Form, Alert } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { InputLabel } from "../../components/InputLabel";
import "./style.scss";
import { login } from "../../services/auth.service";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerta: false
    };
  }

  submit = values => {
    const { username, password } = values;
    login(username, password).then(resposta => {
      if (resposta) {
        window.location.href = "/";
      } else {
        this.setState({ alerta: true });
      }
    });
  };

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const { alerta } = this.state;
    return (
      <Container classe={"login h-100 w-100"}>
        <Row>
          <div className="col">
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
            <Row centralizar={true} classe={"w-75 pb-3 ml-5-2"}>
              <Grid cols={"1 4 4 8"}>
                <Form onSubmit={handleSubmit(this.submit)}>
                  <Field
                    component={InputLabel}
                    label={"RF ou CPF"}
                    id={"username"}
                    type={"text"}
                    autocomplete={"Off"}
                    placeholder={"Insira seu RF ou CPF"}
                    name={"username"}
                  />
                  <Field
                    component={InputLabel}
                    autocomplete={"Off"}
                    label={"Senha"}
                    id={"senha"}
                    type="password"
                    placeholder={"Insira sua senha"}
                    name={"password"}
                  />
                  <div className="pb-4 d-flex justify-content-end">
                    <NavLink className="link">Esqueci minha senha</NavLink>
                  </div>
                  <div className="pb-4 d-flex justify-content-center">
                    <Alert color="danger" isOpen={alerta} >Usuário e/ou senha inválidos.</Alert>
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
                    <NavLink className="link">Ainda não sou cadastrado</NavLink>
                  </div>
                </Form>
              </Grid>
            </Row>
            <Row centralizar={true} classe={"mt-4"}>
              <img alt="img" src={logoSP} />
            </Row>
          </div>
        </Row>
      </Container>
    );
  }
}

Login = reduxForm({
  form: "login",
  destroyOnUnmount: false
})(Login);

export default Login;
