import React, { Component } from "react";
import Row from "../../components/Row";
import Container from "../../components/Container";
import Form from "../../components/Form";
import bg from "./bg.svg";
import logoSME from "./logoSME.svg";
import InputLabel from "../../components/InputLabel";
import Grid from "../../components/Grid";

export default class Login extends Component {
  render() {
    return (
      <Container classe={"login"}>
        <Row>
          <div className="col">
            <img alt="img" height="70%" width="100%" src={bg} />
          </div>
          <div className="col">
            <Row classe={"d-flex justify-content-center"}>LOGO</Row>
            <div className="pt-2"></div>
            <Row classe={"d-flex justify-content-center"}>
              <Grid cols={"1 4 4 8"}>
                <Form>
                  <InputLabel
                    label={"RF ou CPF"}
                    id={"username"}
                    type={"text"}
                    autocomplete={"Off"}
                  />
                  <InputLabel label={"Senha"} id={"senha"} type={"password"} />
                </Form>
              </Grid>
            </Row>
            <Row classe={"d-flex justify-content-center"}>
              <img alt="img" src={logoSME} />
            </Row>
          </div>
        </Row>
      </Container>
    );
  }
}
