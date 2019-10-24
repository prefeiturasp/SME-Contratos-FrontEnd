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
import "../Login/style.scss";
import Login from "../Login";
import { esqueciMinhaSenha } from "../../service/auth.service";

class EsqueciMinhaSenha extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerta: false,
      mensagemError: "",
    };
  }

  submit = values => {
    const { username } = values;
    esqueciMinhaSenha(username).then(response => {
      if(response.status === 200){
        this.setState({
          mensagemError: response.detail,
          alerta: true
        })
      }
    });
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
    const { alerta, mensagemError } = this.state;
    return (
      <div>
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
                    label={"RF ou CPF"}
                    id={"username"}
                    type={"text"}
                    autocomplete={"Off"}
                    placeholder={"Digite seu RF ou CPF"}
                    name={"username"}
                  />
                  <div className="pb-4 d-flex justify-content-end"></div>
                  <div className="pb-4 d-flex justify-content-center">
                    <Alert color="success" isOpen={alerta}>
                      {mensagemError}
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
      </div>
    );
  }
}

EsqueciMinhaSenha = reduxForm({
  form: "esqueciMinhaSenha",
  destroyOnUnmount: false
})(EsqueciMinhaSenha);

export default EsqueciMinhaSenha;
