import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import ListaEditais from "../../components/ListarEditais";
import { hasFlashMessage, getFlashMessage } from "../../utils/flashMessages";
import { Messages } from "primereact/messages";

export default class ListarEditaisPage extends Component {

  mensagemAlerta = () => {
    if (hasFlashMessage("sucesso")) {
      this.messages.show({
        severity: "success",
        life: 10000,
        detail: getFlashMessage("sucesso")
      });
    }

    if (hasFlashMessage("error")) {
      this.messages.show({
        severity: "error",
        life: 10000,
        detail: getFlashMessage("error")
      });
    }
    
    if (hasFlashMessage("warning")) {
      this.messages.show({
        severity: "warn",
        life: 10000,
        detail: getFlashMessage("warning")
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
        <h4>Editais</h4>
        <Container>
          <ListaEditais />
        </Container>
      </Page>
    );
  }
}
