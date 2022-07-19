import React, { Component } from "react";
import { Button, Label } from "reactstrap";
import {
  getListSubprefeituras,
  getListaDREs,
} from "../../../service/Sigpae.service";
import { formatarDREs, formatarUnidades } from "../helper";
import { getEquipamentos } from "../../../service/Equipamentos.service";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";

const tipos_unidade = [
  {
    nome: "UA – Unidade Administrativa",
    id: "3",
  },
  {
    nome: "CEU – Centro Educacional Unificado",
    id: "19",
  },
  {
    nome: "UE – Unidade Escolar",
    id: "1",
  },
];

const tipos_escola = [
  { id: 1, nome: "EMEF" },
  { id: 2, nome: "EMEI" },
  { id: 3, nome: "EMEFM" },
  { id: 4, nome: "EMEBS" },
  { id: 10, nome: "CEI DIRET" },
  { id: 11, nome: "CEI INDIR" },
  { id: 12, nome: "CR.P.CONV" },
  { id: 13, nome: "CIEJA" },
  { id: 14, nome: "CCI/CIPS" },
  { id: 15, nome: "ESC.PART." },
  { id: 16, nome: "CEU EMEF" },
  { id: 17, nome: "CEU EMEI" },
  { id: 18, nome: "CEU CEI" },
  { id: 20, nome: "CECI " },
  { id: 22, nome: "MOVA" },
  { id: 23, nome: "CMCT" },
  { id: 24, nome: "ESC PART NR" },
  { id: 25, nome: "E TEC" },
  { id: 26, nome: "ESP CONV" },
  { id: 27, nome: "CEU AT COMPL" },
  { id: 28, nome: "CEMEI" },
  { id: 29, nome: "CCA" },
  { id: 30, nome: "CECI" },
  { id: 31, nome: "CEU CEMEI" },
];
export class FiltroUnidades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dres: null,
      subprefeituras: null,
      cd_equipamento: "",
      nm_equipamento: "",
      dres_selecionadas: [],
      subprefeituras_selecionadas: [],
      tp_unidade: [],
      tp_unidade_escolar: [],
      loading: false,
      buscaCodigoEOL: false,
    };
  }

  async componentDidMount() {
    const dres = await getListaDREs();
    const subprefeituras = await getListSubprefeituras();
    this.setState({
      dres: formatarDREs(dres.results),
      subprefeituras: subprefeituras.results,
    });
  }

  limpar = () => {
    this.setState({
      cd_equipamento: "",
      nm_equipamento: "",
      subprefeituras_selecionadas: [],
      dres_selecionadas: [],
      tp_unidade: [],
      tp_unidade_escolar: [],
      buscaCodigoEOL: false,
    });
  };

  formataFiltro = filtros => {
    let filtrosFormatados = {
      codigo_dre:
        filtros.dres_selecionadas.length > 0
          ? filtros.dres_selecionadas.map(x => x.codigo_eol)
          : "",
      codigo_subprefeitura:
        filtros.subprefeituras_selecionadas.length > 0
          ? filtros.subprefeituras_selecionadas.map(x => x.codigo_eol)
          : "",
      tipo_escola:
        filtros.tp_unidade_escolar.length > 0
          ? filtros.tp_unidade_escolar.map(x => x.id)
          : "",
      tipo_unidade:
        filtros.tp_unidade.length > 0 ? filtros.tp_unidade.map(x => x.id) : "",
      nome_unidade: filtros.nm_equipamento,
      codigo_eol_unidade: filtros.cd_equipamento,
    };

    return filtrosFormatados;
  };

  filtrar = async () => {
    this.setState({ loading: true });
    const response = await getEquipamentos(this.formataFiltro(this.state));
    this.setState({ unidades: formatarUnidades(response) });
    this.props.setUnidades(formatarUnidades(response));
    this.setState({ loading: false });
  };

  setBuscaCodigoEOL = codigo => {
    if (codigo !== "") {
      this.setState({
        cd_equipamento: codigo,
        nm_equipamento: "",
        subprefeituras_selecionadas: [],
        dres_selecionadas: [],
        tp_unidade: [],
        tp_unidade_escolar: [],
        buscaCodigoEOL: true,
      });
    } else {
      this.setState({ cd_equipamento: codigo, buscaCodigoEOL: false });
    }
  };

  render() {
    const {
      dres,
      subprefeituras,
      cd_equipamento,
      nm_equipamento,
      dres_selecionadas,
      subprefeituras_selecionadas,
      tp_unidade,
      tp_unidade_escolar,
      loading,
      buscaCodigoEOL,
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <label>Código EOL</label>
            <InputText
              className="w-100"
              value={cd_equipamento}
              name="cd_equipamento"
              onChange={event => {
                this.setBuscaCodigoEOL(event.target.value);
              }}
              placeholder="Código EOL da instituição"
            />
          </div>
          <div className="col-4">
            <Label form="coordenador">Tipo de Unidade</Label>
            <MultiSelect
              id="tipo_unidade"
              className="w-100"
              value={tp_unidade}
              onChange={e => {
                this.setState({
                  tp_unidade: e.target.value,
                  tp_unidade_escolar: "",
                });
              }}
              disabled={buscaCodigoEOL}
              optionLabel="nome"
              options={tipos_unidade}
              placeholder="Selecione..."
              maxSelectedLabels={1}
              selectedItemsLabel={"{0} tipos selecionados"}
            />
          </div>

          <div className="col-4">
            <Label form="coordenador">DRE</Label>
            <MultiSelect
              id="dres"
              className="w-100"
              value={dres_selecionadas}
              onChange={event =>
                this.setState({ dres_selecionadas: event.target.value })
              }
              disabled={buscaCodigoEOL}
              optionLabel="diretoria"
              options={dres}
              placeholder="Selecione..."
              maxSelectedLabels={1}
              selectedItemsLabel={"{0} DREs selecionadas"}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4">
            <label>Nome da Unidade</label>
            <InputText
              className="w-100"
              value={nm_equipamento}
              disabled={buscaCodigoEOL}
              onChange={event =>
                this.setState({ nm_equipamento: event.target.value })
              }
              name="nm_equipamento"
              placeholder="Digite o nome da unidade"
            />
          </div>
          {tp_unidade.includes(tipos_unidade[2]) && (
            <div className="col-4">
              <Label form="coordenador">Tipo de Unidade Escolar</Label>
              <MultiSelect
                id="tipo_escola"
                className="w-100"
                value={tp_unidade_escolar}
                disabled={buscaCodigoEOL}
                onChange={event =>
                  this.setState({ tp_unidade_escolar: event.target.value })
                }
                optionLabel="nome"
                options={tipos_escola}
                placeholder="Selecione..."
                maxSelectedLabels={1}
                selectedItemsLabel={"{0} tipos selecionadss"}
              />
            </div>
          )}
          <div className="col-4">
            <Label form="coordenador">Subprefeitura</Label>
            <MultiSelect
              id="dres"
              className="w-100"
              value={subprefeituras_selecionadas}
              disabled={buscaCodigoEOL}
              onChange={event =>
                this.setState({
                  subprefeituras_selecionadas: event.target.value,
                })
              }
              optionLabel="nome"
              options={subprefeituras}
              placeholder="Selecione..."
              maxSelectedLabels={1}
              selectedItemsLabel={"{0} Subprefeituras selecionadas"}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12 offset-12 my-auto">
            <Button
              type="button"
              onClick={() => this.filtrar()}
              className="btn-coad-primary float-right"
              disabled={
                !cd_equipamento &&
                !nm_equipamento &&
                !dres_selecionadas &&
                !tp_unidade &&
                !tp_unidade_escolar
              }
            >
              Filtrar
            </Button>
            <Button
              className="btn-coad-background-outline mr-3 float-right"
              type="button"
              onClick={() => this.limpar()}
              disabled={this.props.cancelamento}
            >
              Limpar
            </Button>
          </div>
        </div>
        {loading && <ProgressSpinner className="w-100" />}
      </div>
    );
  }
}
