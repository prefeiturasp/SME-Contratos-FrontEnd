import React, { Component } from "react";
import { Input as InputBootStrap, Button, Label } from "reactstrap";
import { getDiretoriasRegionais } from "../../../service/DiretoriasRegionais.service";
import { formatarDREs, formatarUnidades } from "../helper";
import { getEquipamentos } from "../../../service/Equipamentos.service";

export class FiltroUnidades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dres: null,
      cd_equipamento: "",
      nm_equipamento: "",
      dre: "",
      tp_unidade: "",
      tp_unidade_escolar: "",
    };
  }

  async componentDidMount() {
    const dres = await getDiretoriasRegionais();
    this.setState({
      dres: formatarDREs(dres.data.results),
    });
  }

  limpar = () => {
    this.setState({
      cd_equipamento: "",
      nm_equipamento: "",
      dre: "",
      tp_unidade: "",
      tp_unidade_escolar: "",
    });
  };

  filtrar = async () => {
    const response = await getEquipamentos(this.state);
    this.setState({ unidades: formatarUnidades(response.data.results) });
    this.props.setUnidades(formatarUnidades(response.data.results));
  };

  render() {
    const {
      dres,
      cd_equipamento,
      nm_equipamento,
      dre,
      tp_unidade,
      tp_unidade_escolar,
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <label>Código EOL</label>
            <InputBootStrap
              value={cd_equipamento}
              name="cd_equipamento"
              onChange={event =>
                this.setState({ cd_equipamento: event.target.value })
              }
              placeholder="Código EOL da instituição"
            />
          </div>
          <div className="col-3">
            <Label form="coordenador">DRE</Label>
            <InputBootStrap
              type="select"
              value={dre}
              onChange={event => this.setState({ dre: event.target.value })}
              name="dre"
            >
              <option value="">Selecione</option>
              {dres
                ? dres.map((dre, i) => {
                    return (
                      <option key={i} value={dre.diretoria}>
                        {dre.diretoria} - {dre.dre}
                      </option>
                    );
                  })
                : ""}
            </InputBootStrap>
          </div>
          <div className="col-3">
            <Label form="coordenador">Tipo de Unidade</Label>
            <InputBootStrap
              type="select"
              value={tp_unidade}
              onChange={event =>
                this.setState({
                  tp_unidade: event.target.value,
                  tp_unidade_escolar: "",
                })
              }
              label="Tipo de Unidade"
              name="tp_unidade"
            >
              <option value="">Selecione</option>
              <option value="UA">Unidade Administrativa</option>
              <option value="CEU">Centro Educacional Unificado - CEU</option>
              <option value="ESC">Unidades Escolares</option>
            </InputBootStrap>
          </div>
          {tp_unidade === "ESC" && (
            <div className="col-3">
              <Label form="coordenador">Tipo de Unidade Escolar</Label>
              <InputBootStrap
                type="select"
                value={tp_unidade_escolar}
                onChange={event =>
                  this.setState({ tp_unidade_escolar: event.target.value })
                }
                name="tp_unidade"
              >
                <option value="">Selecione</option>
                <option value="EMEF">EMEF</option>
                <option value="EMEI">EMEI</option>
                <option value="EMEFM">EMEFM</option>
                <option value="EMEBS">EMEBS</option>
                <option value="CEI DIRET">CEI DIRET</option>
                <option value="CEI INDIRET">CEI INDIRET</option>
                <option value="CIEJA">CIEJA</option>
                <option value="CEU EMEF">CEU EMEF</option>
                <option value="CEU EMEI">CEU EMEI</option>
                <option value="CEU CEI">CEU CEI</option>
                <option value="CMCT">CMCT</option>
                <option value="CEMEI">CEMEI</option>
                <option value="CECI">CECI</option>
                <option value="IF">INSTITUTO FEDERAL</option>
              </InputBootStrap>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-6">
            <label>Nome da Unidade</label>
            <InputBootStrap
              value={nm_equipamento}
              onChange={event =>
                this.setState({ nm_equipamento: event.target.value })
              }
              name="nm_equipamento"
              placeholder="Digite o nome da unidade"
            />
          </div>
          <div className="col-3 offset-3 my-auto">
            <Button
              type="button"
              onClick={() => this.filtrar()}
              className="btn-coad-primary mr-3"
              disabled={
                !cd_equipamento &&
                !nm_equipamento &&
                !dre &&
                !tp_unidade &&
                !tp_unidade_escolar
              }
            >
              Filtrar
            </Button>
            <Button
              className="btn-coad-background-outline"
              type="button"
              onClick={() => this.limpar()}
              disabled={this.props.cancelamento}
            >
              Limpar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
