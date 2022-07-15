import React, { Component } from "react";
import { Input as InputBootStrap, Button } from "reactstrap";

export class AdicionarComplementos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lote: "",
    };
  }

  setFiscalESuplentes = () => {
    this.props.setFiscalESuplentes(this.state);
  };

  setLote = lote => {
    const { unidadesSelecionadas } = this.props;
    if (
      unidadesSelecionadas &&
      unidadesSelecionadas.find(unidade => unidade.lote === lote)
    ) {
      this.setState(
        {
          lote: lote,
          nome_fiscal: unidadesSelecionadas.find(
            unidade => unidade.lote === lote,
          ).nome_fiscal,
          rf_fiscal: unidadesSelecionadas.find(unidade => unidade.lote === lote)
            .rf_fiscal,
          suplentes: unidadesSelecionadas.find(unidade => unidade.lote === lote)
            .suplentes,
          loteExistente: true,
        },
        () => {
          this.setFiscalESuplentes();
        },
      );
    } else {
      this.setState(
        {
          lote: lote,
          nome_fiscal: "",
          rf_fiscal: "",
          suplentes: [],
          loteExistente: false,
        },
        () => {
          this.setFiscalESuplentes();
        },
      );
    }
  };

  adicionarSuplente = () => {
    let { suplentes } = this.state;
    suplentes.push({
      nome: "",
      rf: "",
    });
    this.setState({ suplentes }, () => {
      this.setFiscalESuplentes();
    });
  };

  removerSuplente = index => {
    let { suplentes } = this.state;
    suplentes.splice(index, 1);
    this.setState({ suplentes }, () => {
      this.setFiscalESuplentes();
    });
  };

  render() {
    const { lote } = this.state;
    const { adicionarUnidadesSelecionadas } = this.props;
    return (
      <div className="adicionar-complementos">
        <div className="row pt-3">
          <div className="col-8">
            <label>Número/Nome do Lote</label>
            <InputBootStrap
              name="lote"
              value={lote}
              onChange={event => this.setLote(event.target.value)}
              placeholder="Lote das unidades"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Button
              onClick={() => adicionarUnidadesSelecionadas()}
              type="button"
              className="btn-coad-background-outline mt-3 float-right"
              disabled={!lote}
            >
              Adicionar lote
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
