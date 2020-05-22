import React, { Component, Fragment } from "react";
import { FiltroUnidades } from "./FiltroUnidades";
import { TabelaUnidadesParaSelecionar } from "./TabelaUnidadesParaSelecionar";
import { AdicionarComplementos } from "./AdicionarComplementos";
import { TabelaUnidades } from "./TabelaUnidades";

export class UnidadesEnvolvidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unidades: null,
      unidadesSelecionadas: [],
      todosSelecionados: false,
      lote: "",
      rf_fiscal: "",
      nome_fiscal: "",
      suplentes: [],
    };
  }

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
    this.setState({ unidadesSelecionadas });
  };

  adicionarUnidadesSelecionadas = () => {
    const {
      unidades,
      unidadesSelecionadas,
      lote,
      rf_fiscal,
      nome_fiscal,
      suplentes,
    } = this.state;
    unidades
      .filter((unidade) => unidade.checked)
      .forEach((unidade) => {
        unidadesSelecionadas.push({
          unidade: unidade,
          lote: lote,
          rf_fiscal: rf_fiscal,
          nome_fiscal: nome_fiscal,
          suplentes: suplentes,
        });
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
    this.props.setUnidadesSelecionadas(unidadesSelecionadas);
  };

  render() {
    const { unidades, unidadesSelecionadas, todosSelecionados } = this.state;
    return (
      <div>
        <FiltroUnidades setUnidades={this.setUnidades} />
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
            />
          </Fragment>
        )}
        <TabelaUnidades
          unidadesSelecionadas={unidadesSelecionadas}
          removerUnidadeSelecionada={this.removerUnidadeSelecionada}
        />
      </div>
    );
  }
}
