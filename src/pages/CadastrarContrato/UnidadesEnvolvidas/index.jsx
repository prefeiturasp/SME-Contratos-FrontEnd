import React, { Component, Fragment } from "react";
import { FiltroUnidades } from "./FiltroUnidades";
import { TabelaUnidadesParaSelecionar } from "./TabelaUnidadesParaSelecionar";
import { AdicionarComplementos } from "./AdicionarComplementos";
import { TabelaUnidades } from "./TabelaUnidades";
import { getUnidadesSelecionadas } from "../../VisualizarContrato/helpers";

export class UnidadesEnvolvidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unidades: null,
      unidadesSelecionadas: null,
      todosSelecionados: false,
      lote: "",
      rf_fiscal: "",
      nome_fiscal: "",
      suplentes: [],
    };
  }

  componentDidUpdate = () => {
    if (
      this.props.contrato &&
      this.props.contrato.lotes.length > 0 &&
      !this.state.unidadesSelecionadas
    ) {
      this.setState(
        {
          unidadesSelecionadas: getUnidadesSelecionadas(this.props.contrato),
        },
        () => {
          this.props.setUnidadesSelecionadas(
            getUnidadesSelecionadas(this.props.contrato)
          );
        }
      );
    }
  };

  setUnidades = (unidades) => {
    this.setState({ unidades });
  };

  checkUnidade = (index) => {
    let { unidades } = this.state;
    unidades[index].checked = !unidades[index].checked;
    this.setState({ unidades });
  };

  selecionarTodos = () => {
    let { unidades, todosSelecionados } = this.state;
    todosSelecionados = !todosSelecionados;
    unidades = unidades.map((unidade) => {
      unidade.checked = todosSelecionados;
      return unidade;
    });
    this.setState({ unidades, todosSelecionados });
  };

  setFiscalESuplentes = ({ lote, rf_fiscal, nome_fiscal, suplentes }) => {
    this.setState({
      lote,
      rf_fiscal,
      nome_fiscal,
      suplentes,
    });
  };

  removerUnidadeSelecionada = (key) => {
    let { unidadesSelecionadas } = this.state;
    unidadesSelecionadas.splice(key, 1);
    this.setState({ unidadesSelecionadas }, () => {
      this.props.setUnidadesSelecionadas(unidadesSelecionadas);
    });
  };

  adicionarUnidadesSelecionadas = () => {
    const { unidades, lote, rf_fiscal, nome_fiscal, suplentes } = this.state;
    let { unidadesSelecionadas } = this.state;
    if (unidades.filter((unidade) => unidade.checked).length === 0) {
      this.props.messages.show({
        severity: "warn",
        life: 10000,
        detail: "É preciso selecionar ao menos uma unidade",
      });
      window.scrollTo(0, 0);
    } else {
      unidades
        .filter((unidade) => unidade.checked)
        .forEach((unidade) => {
          if (
            unidadesSelecionadas &&
            unidadesSelecionadas.find(
              (unidadeSelecionada) =>
                unidadeSelecionada.unidade.cd_equipamento ===
                unidade.cd_equipamento
            )
          ) {
            this.props.messages.show({
              severity: "error",
              life: 10000,
              detail: `Unidade ${unidade.cd_equipamento} já pertence a um lote`,
            });
            window.scrollTo(0, 0);
          } else {
            if (!unidadesSelecionadas) unidadesSelecionadas = [];
            unidadesSelecionadas.push({
              unidade: unidade,
              lote: lote,
              rf_fiscal: rf_fiscal,
              nome_fiscal: nome_fiscal,
              suplentes: suplentes,
            });
            this.setState({
              unidadesSelecionadas,
              unidades: null,
              lote: "",
              rf_fiscal: "",
              nome_fiscal: "",
              suplentes: [],
              selecionarTodos: false,
            });
          }
        });
      this.props.setUnidadesSelecionadas(unidadesSelecionadas);
    }
  };

  render() {
    const { unidades, unidadesSelecionadas, todosSelecionados } = this.state;
    const { disabilitado } = this.props;
    return (
      <div>
        {!disabilitado && <FiltroUnidades setUnidades={this.setUnidades} />}
        <hr />
        {unidades && (
          <Fragment>
            <TabelaUnidadesParaSelecionar
              unidades={unidades}
              checkUnidade={this.checkUnidade}
              todosSelecionados={todosSelecionados}
              selecionarTodos={this.selecionarTodos}
            />
            <hr />
            <AdicionarComplementos
              adicionarUnidadesSelecionadas={this.adicionarUnidadesSelecionadas}
              setFiscalESuplentes={this.setFiscalESuplentes}
              unidadesSelecionadas={unidadesSelecionadas}
            />
          </Fragment>
        )}
        <TabelaUnidades
          unidadesSelecionadas={unidadesSelecionadas}
          removerUnidadeSelecionada={this.removerUnidadeSelecionada}
          disabilitado={disabilitado}
        />
      </div>
    );
  }
}
