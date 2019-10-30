import React, { Component } from "react";
import Container from "../../Global/Container";
import { Messages } from "primereact/messages";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  getTermo,
  createContrato,
  updateContrato
} from "../../../service/Contratos.service";
import { BuscaIncrementalServidores } from "../BuscaIncrementalServidores";
import { Dialog } from "primereact/dialog";

export default class AtribuirTermoContrato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termo_contrato: "",
      gestor: null,
      suplente: null,
      visible: false,
      btnCadastrarVisible: true,
      btnAlterarVisible: false,
      btnCancelarVisible: false,
      contratoUuid: null
    };
    this.onClick = this.onClick.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  updateGestor(servidorGestor) {
    this.setState({ gestor: servidorGestor });
  }

  updateSuplente(servidorSuplente) {
    this.setState({ suplente: servidorSuplente });
  }

  async handleClickCadastratar() {
    const payLoad = {
      termo_contrato: this.state.termo_contrato,
      gestor: this.state.gestor ? this.state.gestor.uuid : null,
      suplente: this.state.suplente ? this.state.suplente.uuid : null
    };

    const termo = await getTermo(payLoad.termo_contrato);
    if (!termo || termo.length === 0) {
      createContrato(payLoad);

      this.messages.show({
        severity: "success",
        life: 5000,
        detail:
          "Termo de Contrato cadastrado. Gestor e suplente serão nofificados via sistema e e-mail."
      });

      this.reset();
    } else {
      this.setState({ contratoUuid: termo[0].uuid });
      this.messages.show({
        severity: "info",
        life: 8000,
        detail:
          "Termo de contrato já cadastrado. Você pode edita-lo alterando Gestor ou Suplente."
      });

      this.setState({ gestor: termo[0].gestor });
      this.setState({ suplente: termo[0].suplente });
      this.setState({ btnCadastrarVisible: false });
      this.setState({ btnAlterarVisible: true });
      this.setState({ btnCancelarVisible: true });
    }
    this.setState({ visible: false });
  }

  handleClickAlterar() {
    const payLoadAlterar = {
      termo_contrato: this.state.termo_contrato,
      gestor: this.state.gestor ? this.state.gestor.uuid : null,
      suplente: this.state.suplente ? this.state.suplente.uuid : null
    };
    updateContrato(payLoadAlterar, this.state.contratoUuid);

    this.messages.show({
      severity: "success",
      life: 5000,
      detail:
        "Termo de Contrato cadastrado. Gestor e suplente serão nofificados via sistema e e-mail."
    });
    this.setState({ btnCadastrarVisible: true });
    this.setState({ btnAlterarVisible: false });
    this.setState({ btnCancelarVisible: false });
  }

  onClick() {
    this.setState({ visible: true });
  }

  onHide() {
    this.setState({ visible: false });
  }

  clear() {
    this.messages.clear();
  }

  reset() {
    this.setState({ termo_contrato: "" });
    this.setState({ gestor: null });
    this.setState({ suplente: null });
    this.setState({ btnCadastrarVisible: true });
    this.setState({ btnAlterarVisible: false });
    this.setState({ btnCancelarVisible: false });
  }

  render() {
    const footer = (
      <span className="float-right">
        {this.state.btnCadastrarVisible && (
          <Button
            label="Cadastrar"
            style={{ marginRight: ".25em" }}
            onClick={this.onClick}
          />
        )}

        {this.state.btnAlterarVisible && (
          <Button
            label="Alterar"
            style={{ marginRight: ".25em" }}
            onClick={this.handleClickAlterar.bind(this)}
            className="btn-coad-background-outline"
          />
        )}

        {this.state.btnCancelarVisible && (
          <Button
            label="Cancelar"
            style={{ marginRight: ".25em" }}
            onClick={e => this.reset()}
          />
        )}
      </span>
    );

    const footerModal = (
      <div>
        <Button
          label="Confirmar"
          style={{ marginRight: ".25em" }}
          onClick={this.handleClickCadastratar.bind(this)}
          className="btn-coad-background-outline"
        />
        <Button
          label="Cancelar"
          style={{ marginRight: ".25em" }}
          onClick={this.onHide}
        />
      </div>
    );
    return (
      <Container>
        <Messages ref={el => (this.messages = el)}></Messages>
        <Dialog
          header="Atribuir Termo de Contrato?"
          visible={this.state.visible}
          style={{ width: "50vw" }}
          footer={footerModal}
          onHide={this.onHide}
        >
          <p>
            Deseja atribuir Termo de Contrato? <br />
            <br />
            Termo de Contrato: {this.state.termo_contrato}
            <br />
            Gestor: {this.state.gestor ? this.state.gestor.nome : null}
            <br />
            Suplente: {this.state.suplente ? this.state.suplente.nome : null}
          </p>
        </Dialog>
        <h6 style={{ marginLeft: 15, fontWeight: "bold" }}>
          Atribuir Termo de Contrato
        </h6>
        <Card footer={footer}>
          <div className="p-grid p-fluid">
            <div className="p-col-6">
              <label for="termo_contrato">Termo de Contrato</label>
              <InputText
                value={this.state.termo_contrato}
                onChange={e =>
                  this.setState({ termo_contrato: e.target.value })
                }
                required="true"
                placeholder="Ex.: 00/00"
              />
            </div>
            <div className="p-col-6">
              <label for="gestor">Nome Gestor de Contrato</label>
              <BuscaIncrementalServidores
                placeholder="Ex.: Nome e sobrenome"
                userName={this.state.gestor ? this.state.gestor.username : ""}
                onUpdate={servidorGestor => this.updateGestor(servidorGestor)}
              />
            </div>
            <div className="p-col-6 p-offset-6">
              <label for="gestor">Nome Suplente de Contrato</label>
              <BuscaIncrementalServidores
                placeholder="Ex.: Nome e sobrenome"
                userName={
                  this.state.suplente ? this.state.suplente.username : ""
                }
                onUpdate={servidorSuplente =>
                  this.updateSuplente(servidorSuplente)
                }
              />
            </div>
          </div>
        </Card>
      </Container>
    );
  }
}
