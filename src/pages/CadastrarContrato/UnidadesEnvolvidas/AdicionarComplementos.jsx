import React, { Component } from "react";
import { Input as InputBootStrap, Button } from "reactstrap";
import { getUsuarioByUserName } from "../../../service/Usuarios.service";

export class AdicionarComplementos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lote: "",
      rf_fiscal: "",
      nome_fiscal: "",
      suplentes: [],
      loteExistente: false,
    };
  }

  pesquisarRF = async (rf, key = null) => {
    if (rf && rf.length === 7) {
      const resultado = await getUsuarioByUserName(rf);
      if (resultado) {
        if (key !== null) {
          let { suplentes } = this.state;
          suplentes[key].rf = rf;
          suplentes[key].nome = resultado.nome;
          this.setState({ suplentes }, () => {
            this.setFiscalESuplentes();
          });
        } else {
          this.setState(
            {
              rf_fiscal: rf,
              nome_fiscal: resultado.nome,
            },
            () => {
              this.setFiscalESuplentes();
            }
          );
        }
      } else {
        if (key !== null) {
          let { suplentes } = this.state;
          suplentes[key].rf = undefined;
          suplentes[key].nome = "";
          this.setState({ suplentes }, () => {
            this.setFiscalESuplentes();
          });
        } else {
          this.setState(
            {
              rf_fiscal: null,
              nome_fiscal: "",
            },
            () => {
              this.setFiscalESuplentes();
            }
          );
        }
      }
    } else {
      if (key !== null) {
        let { suplentes } = this.state;
        suplentes[key].rf = rf;
        suplentes[key].nome = "";
        this.setState({ suplentes }, () => {
          this.setFiscalESuplentes();
        });
      } else {
        this.setState(
          {
            rf_fiscal: rf,
            nome_fiscal: "",
          },
          () => {
            this.setFiscalESuplentes();
          }
        );
      }
    }
  };

  setFiscalESuplentes = () => {
    this.props.setFiscalESuplentes(this.state);
  };

  setLote = (lote) => {
    const { unidadesSelecionadas } = this.props;
    if (unidadesSelecionadas.find((unidade) => unidade.lote === lote)) {
      this.setState(
        {
          lote: lote,
          nome_fiscal: unidadesSelecionadas.find(
            (unidade) => unidade.lote === lote
          ).nome_fiscal,
          rf_fiscal: unidadesSelecionadas.find(
            (unidade) => unidade.lote === lote
          ).rf_fiscal,
          suplentes: unidadesSelecionadas.find(
            (unidade) => unidade.lote === lote
          ).suplentes,
          loteExistente: true,
        },
        () => {
          this.setFiscalESuplentes();
        }
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
        }
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

  removerSuplente = (index) => {
    let { suplentes } = this.state;
    suplentes.splice(index, 1);
    this.setState({ suplentes }, () => {
      this.setFiscalESuplentes();
    });
  };

  render() {
    const {
      lote,
      rf_fiscal,
      nome_fiscal,
      suplentes,
      loteExistente,
    } = this.state;
    const { adicionarUnidadesSelecionadas } = this.props;
    return (
      <div className="adicionar-complementos">
        <div className="title font-weight-bold">
          Adicionar Complemento na Lista de Unidades do Filtro
        </div>
        <div className="row pt-3">
          <div className="col-4">
            <label>Lote</label>
            <InputBootStrap
              name="lote"
              value={lote}
              onChange={(event) => this.setLote(event.target.value)}
              placeholder="Lote das unidades"
            />
          </div>
          <div className="col-4">
            <label>RF do Fiscal do Contrato</label>
            <InputBootStrap
              name="rf_fiscal"
              value={rf_fiscal}
              onChange={(event) => this.pesquisarRF(event.target.value)}
              placeholder="RF do Fiscal"
              disabled={loteExistente}
            />
          </div>
          <div className="col-4">
            <label>Nome do Fiscal do Contrato</label>
            <InputBootStrap value={nome_fiscal} name="nome_fiscal" disabled />
          </div>
        </div>
        {suplentes.map((suplente, key) => {
          return (
            <div key={key} className="row pt-2">
              <div className="col-4">
                <label>RF do Suplente</label>
                <InputBootStrap
                  name="rf"
                  value={suplente.rf}
                  onChange={(event) =>
                    this.pesquisarRF(event.target.value, key)
                  }
                  placeholder="RF do Suplente"
                  disabled={loteExistente}
                />
              </div>
              <div className="col-4">
                <label>Nome do Suplente</label>
                <InputBootStrap value={suplente.nome} name="nome" disabled />
              </div>
              <div className="col-4 mt-auto">
                <Button
                  type="button"
                  onClick={() => this.removerSuplente(key)}
                  className="btn-coad-primary"
                >
                  Remover
                </Button>
              </div>
            </div>
          );
        })}
        <div className="row">
          <div className="col-4">
            <Button
              onClick={() => this.adicionarSuplente()}
              type="button"
              className="btn-coad-primary mt-3"
            >
              Adicionar suplente
            </Button>
          </div>
          <div className="col-4 offset-4">
            <Button
              onClick={() => adicionarUnidadesSelecionadas()}
              type="button"
              className="btn-coad-primary mt-3"
              disabled={!lote || !nome_fiscal}
            >
              Adicionar complemento
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
