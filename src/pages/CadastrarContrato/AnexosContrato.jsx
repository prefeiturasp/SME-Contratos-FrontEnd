import React, { Component } from "react";
import { Card } from "reactstrap";
import { Field } from "formik";
import { CoadEditor } from "../../components/Contratos/CoadForm";
import Anexos from "../VisualizarContrato/Anexos";
import { Button } from "reactstrap";

export default class AnexosContrato extends Component {
  state = {};

  cancelar = () => {
    this.props.cancelar();
    this.props.jumpToStep(0);
  };

  cadastrar = () => {
    this.props.jumpToStep(3)
  }

  render() {
    return (
      <>
        <strong>
          <i className="fas fa-lg fa-file-signature" /> Anexos/Observações
        </strong>
        <Card className="mt-3">
          <strong>Anexos</strong>
          <Anexos />
        </Card>
        <Card>
          <strong>Observações</strong>
          <div className="my-2"></div>
          <Field
            component={CoadEditor}
            name="observacoes"
            id="observacoes"
            style={{ height: "200px" }}
            label="Escreva observações sobre contrato"
          />
        </Card>
        <div className="d-flex flex-row-reverse mt-4">
          <Button
            onClick={() => this.cadastrar()}
            type="button"
            className="btn-coad-primary"
          >
            Cadastrar
          </Button>
          <Button
            type="button"
            onClick={() => this.cancelar()}
            className="btn-coad-background-outline mx-3"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => this.props.jumpToStep(1)}
            className="btn-coad-background-outline"
          >
            Voltar
          </Button>
        </div>
      </>
    );
  }
}
