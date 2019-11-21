import React, { Component } from "react";
import { Row, Col, Card } from "reactstrap";
import { Select, Input } from "formik-reactstrap-widgets";
import { Field } from "formik";
import { CoadTextInput, CoadEditor } from "../../components/Contratos/CoadForm";
import Anexos from "../VisualizarContrato/Anexos";


export default class AnexosContrato extends Component {
  state = {};

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
      </>
    );
  }
}
