import React, { Component } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import {
  getCamposContrato,
  updateColunasContrato
} from "../../../service/Contratos.service";

export class SelecionaColunasContrato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      colunas2: getCamposContrato(),
      colunas: [
        {
          field: "termo_contrato",
          header: "TC"
        },
        {
          field: "processo",
          header: "Processo"
        },
        {
          field: "tipo_servico.nome",
          header: "Tipode de Serviço"
        },
        {
          field: "empresa_contratada.nome",
          header: "Empresa"
        },
        {
          field: "estado_contrato",
          header: "Estado do Contrato"
        },
        {
          field: "data_encerramento",
          header: "Data Encerramento"
        },
        {
          field: "nucleo_responsavel.sigla",
          header: "Núcleo Responsável"
        },
        {
          field: "data_assinatura",
          header: "Data Assinatura"
        },
        {
          field: "data_ordem_inicio",
          header: "Data Ordem de Inicio"
        },
        {
          field: "vigencia_em_dias",
          header: "Vigencia"
        },
        {
          field: "situacao",
          header: "Situação"
        },
        {
          field: "gestor.nome",
          header: "Gestor"
        },
        {
          field: "suplente.nome",
          header: "Suplente"
        },
        {
          field: "dres",
          header: "DREs"
        }
      ],
      selectedCols: []
    };

    this.onColunasChange = this.onColunasChange.bind(this);
  }

  onColunasChange(e) {
    let colunasSelecionadas = [...this.state.selectedCols];

    if (e.checked) colunasSelecionadas.push(e.value);
    else colunasSelecionadas.splice(colunasSelecionadas.indexOf(e.value), 1);

    this.setState({ selectedCols: colunasSelecionadas });
  }
  updateColunas() {
    const payLoad = {
      uuid: this.props.uuid,
      colunas_array: this.state.selectedCols
    };
    updateColunasContrato(payLoad);
  }
  handleClickAplicar() {
    this.props.onAplicarClick(this.state.selectedCols);
    this.updateColunas();
  }

  render() {
    const footer = (
      <span>
        <Button
          label="Aplicar"
          style={{ marginRight: ".25em" }}
          onClick={this.handleClickAplicar.bind(this)}
        />
      </span>
    );
    return (
      <Card footer={footer}>
        <div className="p-grid p-justify-start">
          {this.state.colunas.map((cols, i) => (
            <div className="p-col-4">
              <Checkbox
                inputId={cols.field}
                value={cols}
                onChange={this.onColunasChange}
                checked={this.state.selectedCols.indexOf(cols) !== -1}
              ></Checkbox>
              <label htmlFor={cols.field} className="p-checkbox-label">
                {cols.header}
              </label>
            </div>
          ))}
        </div>
      </Card>
    );
  }
}
