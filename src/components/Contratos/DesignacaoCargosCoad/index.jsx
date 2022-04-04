import React, { Component } from "react";
import CoadAccordion from "../../Global/CoadAccordion";
import { Button } from "primereact/button";
import { Button as AntButton } from "antd";
import { BuscaIncrementalServidores } from "../BuscaIncrementalServidores";
import {
  getCargosCoad,
  updateCoordenadorCoad,
  updateAssessoresCoad,
} from "../../../service/Cargos.service";

export default class DesignacaoCargosCoad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cargosCoad: null,
      coordenador: null,
      assessores: [],
      userName: null,
    };
  }

  componentDidMount() {
    this.resetCargos();
  }

  updateUsername(servidor) {
    this.setState({ userName: servidor.username });
  }

  updateCoordenador(coordenador) {
    this.setState({ coordenador });
  }

  updateAssessor(assessor, idx) {
    let assessores = this.state.assessores;
    assessores[idx].assessor = assessor;
    this.setState({ assessores });
  }

  limpaAssessoresVazios() {
    const assessores = this.state.assessores.filter(assessor => {
      return assessor.assessor.username !== "";
    });

    this.setState({ assessores });
  }

  updateCargosCoad() {
    this.limpaAssessoresVazios();
    updateCoordenadorCoad(this.state.coordenador);
    updateAssessoresCoad(this.state.assessores);

    this.props.showMessage({
      severity: "success",
      life: 5000,
      detail: "Alterações realizadas com sucesso.",
    });
  }

  cancelUpdateCargosCoad() {
    this.resetCargos();

    this.props.showMessage({
      severity: "warn",
      life: 5000,
      detail: "Edições descartadas.",
    });
  }

  async resetCargos() {
    const cargosCoad = await getCargosCoad();
    this.setState({
      cargosCoad,
      coordenador: cargosCoad.coordenador,
      assessores: cargosCoad.assessores,
    });
  }

  removeAssessor(idx) {
    const assessores = this.state.assessores;
    assessores.splice(idx, 1);
    this.setState({ assessores });
  }

  appendAssessor() {
    const emptyAssessor = {
      coad: 1,
      id: null,
      assessor: {
        username: "",
      },
    };

    const assessores = this.state.assessores;

    assessores.push(emptyAssessor);

    this.setState(assessores);
  }
  render() {
    return (
      <div>
        <CoadAccordion titulo={"COAD"}>
          <div className="p-grid p-fluid" style={{ marginLeft: "-1.9em" }}>
            <div className="p-col-12">
              <h6>Coordenador</h6>
              <BuscaIncrementalServidores
                userName={
                  this.state.coordenador ? this.state.coordenador.username : ""
                }
                onUpdate={servidor => this.updateCoordenador(servidor)}
                placeholder="Selecione o coordenador..."
              />
            </div>
          </div>

          {this.state.assessores.map((assessor, idx) => {
            return (
              <div
                key={idx}
                className="p-grid p-fluid"
                style={{ marginLeft: "-1.9em", marginTop: "0.3em" }}
              >
                <div className="p-col-10">
                  <h6>Assessor do Coordenador</h6>
                  <BuscaIncrementalServidores
                    key={assessor.id}
                    userName={
                      assessor.assessor ? assessor.assessor.username : ""
                    }
                    onUpdate={servidor => this.updateAssessor(servidor, idx)}
                    placeholder="Selecione o assessor do coordenador..."
                  />
                </div>
                <div className="p-col-2">
                  <Button
                    style={{ marginTop: "28px" }}
                    label="Remover"
                    onClick={() => this.removeAssessor(idx)}
                  />
                </div>
              </div>
            );
          })}

          <div
            className="p-col-12"
            style={{ padding: "0px", marginLeft: "-1.9em" }}
          >
            <AntButton
              type="link"
              size="small"
              onClick={() => this.appendAssessor()}
            >
              Adicionar Assessor
            </AntButton>
          </div>

          <span className="float-right">
            <Button
              label="Cancelar"
              onClick={() => this.cancelUpdateCargosCoad()}
              className="btn-coad-background-outline"
              style={{ marginRight: ".25em" }}
            />
            <Button
              type="link"
              label="Aplicar"
              onClick={() => this.updateCargosCoad()}
            />
          </span>
        </CoadAccordion>
      </div>
    );
  }
}
