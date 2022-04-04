import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import ListarModelosAteste from "../../components/Atestes/ListarModelosAteste";
import { hasFlashMessage, getFlashMessage } from "../../utils/flashMessages";
import { Messages } from "primereact/messages";

export default class ListarModelosAtestePage extends Component {
  mensagemAlerta = () => {
    if (hasFlashMessage("sucesso")) {
      this.messages.show({
        severity: "success",
        life: 10000,
        detail: getFlashMessage("sucesso"),
      });
    }

    if (hasFlashMessage("error")) {
      this.messages.show({
        severity: "error",
        life: 10000,
        detail: getFlashMessage("error"),
      });
    }

    if (hasFlashMessage("warning")) {
      this.messages.show({
        severity: "warn",
        life: 10000,
        detail: getFlashMessage("warning"),
      });
    }
  };

  componentDidMount() {
    this.mensagemAlerta();
  }

  render() {
    return (
      <Page>
        <Messages ref={el => (this.messages = el)}></Messages>
        <h4>Modelos de Atestes</h4>
        <Container>
          <ListarModelosAteste />
        </Container>
      </Page>
    );
  }
}
