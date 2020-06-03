import React, { Component } from "react";
import Container from "../../../../components/Global/Container";
import { Row, Col } from "reactstrap";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  getTermo,
  createContrato,
  updateContrato,
} from "../../../../service/Contratos.service";
import { Dialog } from "primereact/dialog";
import { BuscaIncrementalCargosProfissoes } from "../BuscaIncrementalCargosProfissoes";

export default class AtribuirCargoProfissao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargoOuProfissao: "",
      tipo: "",
      visible: false,
      btnCadastrarVisible: true,
      btnAlterarVisible: false,
      btnCancelarVisible: false,
      contratoUuid: null,
    };
    this.onClick = this.onClick.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  updateCargoOuProfissao = (cargoOuProfissao) => {
    this.setState({ cargoOuProfissao });
  };

  async handleClickCadastratar() {
    const payLoad = {
      termo_contrato: this.state.termo_contrato,
      gestor: this.state.gestor ? this.state.gestor.uuid : null,
      suplente: this.state.suplente ? this.state.suplente.uuid : null,
    };

    const termo = await getTermo(payLoad.termo_contrato);
    if (!termo || termo.length === 0) {
      createContrato(payLoad);

      this.props.showMessage({
        severity: "success",
        life: 5000,
        detail:
          "Termo de Contrato cadastrado. Gestor e suplente serão notificados via sistema e e-mail.",
      });

      this.reset();
    } else {
      this.setState({ contratoUuid: termo[0].uuid });
      this.props.showMessage({
        severity: "info",
        life: 8000,
        detail:
          "Termo de contrato já cadastrado. Você pode edita-lo alterando Gestor ou Suplente.",
      });

      this.setState({ gestor: termo[0].gestor });
      this.setState({ suplente: termo[0].suplente });
      this.setState({ btnCadastrarVisible: false });
      this.setState({ btnAlterarVisible: true });
      this.setState({ btnCancelarVisible: true });
    }
    this.setState({ visible: false });
    window.location.reload(true);
  }

  handleClickAlterar() {
    const payLoadAlterar = {
      termo_contrato: this.state.termo_contrato,
      gestor: this.state.gestor ? this.state.gestor.uuid : null,
      suplente: this.state.suplente ? this.state.suplente.uuid : null,
    };
    updateContrato(payLoadAlterar, this.state.contratoUuid);

    this.props.showMessage({
      severity: "success",
      life: 5000,
      detail:
        "Termo de Contrato cadastrado. Gestor e suplente serão nofificados via sistema e e-mail.",
    });
    this.reset();
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
    const { cargoOuProfissao, tipo, visible } = this.state;
    const btnHabilitado = cargoOuProfissao && tipo;
    const footer = (
      <span className="float-right">
        {this.state.btnCadastrarVisible && (
          <Button
            label="Cadastrar"
            style={{ marginRight: ".25em" }}
            onClick={this.onClick}
            disabled={!btnHabilitado}
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
            label="Cancelar11"
            style={{ marginRight: ".25em" }}
            onClick={(e) => this.reset()}
          />
        )}
      </span>
    );

    const footerModal = (
      <div>
        <Button
          label="Sim"
          style={{ marginRight: ".25em" }}
          onClick={this.handleClickCadastratar.bind(this)}
          className="btn-coad-background-outline"
        />
        <Button
          label="Não"
          style={{ marginRight: ".25em" }}
          onClick={this.onHide}
        />
      </div>
    );
    return (
      <Container>
        <Dialog
          header="Cadastrar Cargo/Profissão"
          visible={visible}
          style={{ width: "50vw" }}
          footer={footerModal}
          onHide={this.onHide}
        >
          <p>
            Deseja cadastrar um Cargo/Profissão? <br />
            <br />
            Cargo/Profissão: {cargoOuProfissao}
            <br />
            Tipo: {tipo}
          </p>
        </Dialog>
        <h6 style={{ marginLeft: 15, fontWeight: "bold" }}>
          Cadastrar cargo/profissão
        </h6>
        <Card footer={footer}>
          <Row>
            <Col lg={7} xl={7} className="p-fluid">
              <label htmlFor="tipo">Cargo/Profissão</label>
              <br />
              <BuscaIncrementalCargosProfissoes
                placeholder="Ex.: Auxiliar de limpeza"
                updateCargoOuProfissao={this.updateCargoOuProfissao}
              />
            </Col>
            <Col md={12} lg={5} xl={5}>
              <label htmlFor="tipo">Tipo</label>
              <br />
              <InputText
                value={tipo}
                onChange={(e) => this.setState({ tipo: e.target.value })}
                required="true"
                placeholder="Ex.: Turno 1"
                className="w-100"
              />
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}
