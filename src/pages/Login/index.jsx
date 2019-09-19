import React, { Component } from "react";
import Row from "../../components/Row";
import Container from "../../components/Container";
import bg from "./bg.svg";
import logoSP from "./logoSP.svg";
import logoSME from "./logoSME.svg";
import Grid from "../../components/Grid";
import { Button, Form } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from 'redux-form'
import "./style.scss";
import {InputLabel} from "../../components/InputLabel";

export class Login extends Component {

  submit = values => {
    console.log(values)
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <Container classe={"login h-100 w-100"}>
        <Row>
          <div className="col">
            <img alt="img" height="70%" width="100%" src={bg} />
          </div>
          <div className="col">
            <Row centralizar={true} classe={"pt-5 block-logo d-inline-block"}>
              <Grid cols={'2 2 2 2'} classe={'d-flex flex-row-reverse ml-5-2'}><img height={'70'} alt="logo-sme" src={logoSME} /></Grid>
              <Grid cols={'2 2 2 4'} classe={'mr-5'}><h5>Novo sistema de Gestão de Contratos</h5></Grid>
            </Row>
            <div className="pt-2"></div>
            <Row centralizar={true} classe={"w-75 pb-5 ml-5-2"}>
              <Grid cols={"1 4 4 8"}>
                <Form onSubmit={handleSubmit(this.submit)}>
                  <Field
                    component={InputLabel}
                    label={"RF ou CPF"}
                    id={"username"}
                    type={"text"}
                    autocomplete={"Off"}
                    placeholder={'Insira seu RF ou CPF'}
                    name={'username'}
                  />
                  <Field
                      component={InputLabel} 
                      label={"Senha"} 
                      id={"senha"} 
                      type={"password"}
                      placeholder={'Insira sua senha'}
                      name={'password'}
                      />
                  <div className="pb-4 d-flex justify-content-end">
                    <NavLink>Esqueci minha senha</NavLink>
                  </div>

                  <Button 
                        type={'submit'} 
                        color="secondary bt-login" 
                        size="lg" 
                        // disabled={pristine || submitting}
                        block>
                    Acessar
                  </Button>
                  <div className="pt-3 d-flex justify-content-center">
                    <NavLink>Ainda não sou cadastrado</NavLink>
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
  form: 'login',
  destroyOnUnmount: false
})(Login)

export default Login
