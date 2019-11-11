import React, { Component } from "react";
import { FormGroup, Label, Row, Col } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { formatadoMonetario } from "../../utils/formatador";

export default class InformacoeOrcamentaria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dotacao: []
    };
  }

  appendDotacao() {
    const emptyDotacao = {
      classe: "w-75 my-2 mr-1 ",
      placeholder: "Digite nome da dotação"
    };

    const dotacao = this.state.dotacao;
    dotacao.push(emptyDotacao);
    this.setState({ dotacao });
  }

  removerDotacao(index) {
    const dotacao = this.state.dotacao;
    dotacao.splice(index, 1);
    this.setState({ dotacao });
  }

  render() {
    const { totalMensal, valorTotal, disabilitar} = this.props;
    const { dotacao } = this.state;

    return (
      <Row>
        <Col lg={8} xl={8}>
          <Row>
            <Col>
              <FormGroup>
                <Label>Dotação Orçamentária</Label>
                <InputText
                  placeholder={"Digite a dotação"}
                  className="w-100"
                  disabled={disabilitar}
                />
                {dotacao.map((value, index) => {
                  return (
                    <div>
                      <InputText
                        placeholder={value.placeholder}
                        className={value.classe}
                        onChange={e => console.log(e)}
                      />
                      <button onClick={() => this.removerDotacao(index)} className="btn btn-sm btn-coad-primary">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={() => this.appendDotacao()}
                  className="btn bt-link font-weight-bold coad-color"
                  disabled={disabilitar}
                >
                  Adicionar Dotação
                </button>
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col lg={4} xl={4}>
          <Row>
            <Col>
              <FormGroup>
                <Label>Valor mensal do Contrato</Label>
                <InputText
                  value={totalMensal}
                  placeholder={"R$"}
                  onChange={e => this.props.setTotalMensal(e.target.value)}
                  className="w-100"
                  disabled={disabilitar}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>Valor total do Contrato</Label>
                <InputText
                  value={valorTotal}
                  placeholder={"R$"}
                  className="w-100"
                  disabled={disabilitar}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
