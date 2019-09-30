import React, { Component } from "react";
import Row from "../../components/Row";
import Container from "../../components/Container";
import bg from "../../assets/images/bg.svg";
import logoSP from "../../assets/images/logoSP.svg";
import logoSME from "../../assets/images/logoSME.svg";
import Grid from "../../components/Grid";
import { Button, Form, Alert, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { InputLabel } from "../../components/InputLabel";
import "../Login/style.scss";
import { trocarSenha, isPrimeiroAcesso,  removerUsernameTemp} from "../../services/auth.service";
import Login from "../Login";

class PrimeiroAcesso extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerta: false
    };
  }

  componentDidMount() {
    if (!isPrimeiroAcesso()) {
      window.location.href = "/login";
    } 
  }

  submit = values => {
    const { password, password2 } = values;
    if (this.validaSenhas(password, password2)) {
        trocarSenha(password, password2).then(response => {
            if(response.status === 200){
                removerUsernameTemp()
                window.location.href = `/login?msg=${true}`
            }
        })
    }
  };

  validaSenhas = (password, password2) => {
    if (password === password2) {
      return true;
    }
    this.setState({ alerta: true });
    return false;
  };
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const { alerta } = this.state;
    return (
      <Container classe={"login h-100 w-100"}>
        <Row>
          <Col>
            <img alt="img" height="70%" width="100%" src={bg} />
          </Col>
          <Col>
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
                    label={"Senha"}
                    id={"senha1"}
                    type={"password"}
                    autocomplete={"Off"}
                    placeholder={"Digite sua senha"}
                    name={"password"}
                  />
                  <Field
                    component={InputLabel}
                    autocomplete={"Off"}
                    label={"Confirmação de Senha"}
                    id={"senha2"}
                    type="password"
                    placeholder={"Confirmar sua senha"}
                    name={"password2"}
                  />
                  <div className="pb-4 d-flex justify-content-end"></div>
                  <div className="pb-4 d-flex justify-content-center">
                    <Alert color="danger" isOpen={alerta}>
                      Senhas digitadas não são parecidas
                    </Alert>
                  </div>
                  <Row>
                    <Col>
                      <NavLink
                        component={Login}
                        to="/login"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Voltar
                      </NavLink>
                    </Col>
                    <Col>
                      <Button
                        type={"submit"}
                        color="secondary bt-login"
                        size="lg"
                        disabled={pristine || submitting}
                        block
                      >
                        Redefinir
                      </Button>
                    </Col>
                  </Row>
                  <div className="pt-3 d-flex justify-content-center"></div>
                </Form>
              </Grid>
            </Row>
            <Row centralizar={true} classe={"mt-4"}>
              <img alt="img" src={logoSP} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

PrimeiroAcesso = reduxForm({
  form: "primeiroAcesso",
  destroyOnUnmount: false
})(PrimeiroAcesso);

export default PrimeiroAcesso;
