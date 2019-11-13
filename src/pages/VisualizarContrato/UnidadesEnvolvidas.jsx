import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { DataTable, Column } from "primereact/datatable";
import { getUnidades } from "../../service/Unidades.service";
import CurrencyInput from "react-currency-input";

class UnidadeEnvolvidas extends Component {
  state = {
    modal: false,
    unidades: [
      {
        codigo_eol: "",
        tipo_unidade: "",
        equipamento: "",
        dre: "",
        lote: ""
      }
    ],
    unidadesSelect: [],
    valorMensal: 0.0,
    valorTotal: 0.0,
    unidade: null,
    lote: null,
    dre: null
  };

  async componentDidMount() {
    const unidadesSelect = await getUnidades();
    this.setState({ unidadesSelect });
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextProps.unidadesContrato !== this.props.unidadesContrato) {
      this.setState({ unidades: this.props.unidadesContrato });
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleAddUnidade = () => {
    const { unidade, unidadesSelect } = this.state;

    const unidadeSelecionada = unidadesSelect.filter(
      value => value.uuid === unidade
    );

    this.convertToUnidadeContrato(unidadeSelecionada[0]);
  };

  convertToUnidadeContrato = unidade => {
    const { dre, lote, valorTotal, valorMensal, unidades } = this.state;
    const { contrato, termo_contrato, tipo_unidade } = this.state.unidades[0];

    let unidadeContrato = {
      codigo_eol: unidade.codigo_eol,
      contrato: contrato,
      dre: dre,
      lote: lote,
      termo_contrato: termo_contrato,
      tipo_unidade: tipo_unidade,
      tipo_unidade: tipo_unidade,
      unidade: unidade.uuid,
      valor_mensal: valorMensal,
      valor_total: valorTotal,
      equipamento: unidade.equipamento
    };
    unidades.push(unidadeContrato);

    this.setState({ unidades });
  };

  handleValorMensal = (event, maskedValue, floatValue) => {
    this.setState({ valorMensal: floatValue });
  };

  handleValorTotal = (event, maskedValue, floatValue) => {
    this.setState({ valorTotal: floatValue });
  };

  selecionarUnidade = unidade => {
    this.setState({ unidade });
  };

  render() {
    const {
      unidades,
      modal,
      unidadesSelect,
      valorMensal,
      valorTotal
    } = this.state;
    const { disabilitado } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle} className="mt-5 modal-xl">
          <ModalHeader toggle={this.toggle}>
            Adicionar unidade ao Contrato
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Termo de Contrato</Label>
                  <Input disabled={true} value={unidades[0].termo_contrato} />
                </FormGroup>
              </Col>
              <Col lg={8} xl={8}>
                <FormGroup>
                  <Label>Unidade</Label>
                  <select
                    className="form-control"
                    name="unidade"
                    onChange={e => this.selecionarUnidade(e.target.value)}
                  >
                    {unidadesSelect.map((value, i) => {
                      return (
                        <option
                          key={i}
                          value={value.uuid}
                        >{`${value.nome} - ${value.codigo_eol} - ${value.equipamento}`}</option>
                      );
                    })}
                  </select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Valor Mensal</Label>
                  <CurrencyInput
                    value={valorMensal}
                    onChangeEvent={this.handleValorMensal}
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$ "
                    className="form-control"
                    ref="valorMensal"
                  />
                </FormGroup>
              </Col>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Valor Total</Label>
                  <CurrencyInput
                    value={valorTotal}
                    onChangeEvent={this.handleValorTotal}
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$ "
                    className="form-control"
                    ref="valorTotal"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={6} xl={6}>
                <FormGroup>
                  <Label>Lote</Label>
                  <Input
                    placeholder="Lote"
                    onChange={e => this.setState({ lote: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col lg={6} xl={6}>
                <FormGroup>
                  <Label>DRE</Label>
                  <Input
                    placeholder="DRE"
                    onChange={e => this.setState({ dre: e.target.value })}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn-coad-background-outline"
              onClick={this.toggle}
            >
              Cancelar
            </Button>
            <Button
              danger
              className="btn-coad-primary"
              onClick={this.handleAddUnidade}
            >
              Adicionar Unidade
            </Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col lg={12} xl={12}>
            <DataTable value={unidades}>
              <Column field="codigo_eol" header="Código EOL" />
              <Column field="tipo_unidade" header="Un. que Recebem Serviço" />
              <Column field="equipamento" header="Equip." />
              <Column field="dre" header="DRE Corresp." />
              <Column field="lote" header="Lote Corresp." />
            </DataTable>
          </Col>
          <Col className="mt-5">
            <Button
              disabled={disabilitado}
              onClick={this.toggle}
              className="btn-coad-primary"
            >
              <i className="fas fa-plus"></i> Adicionar Unidade
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UnidadeEnvolvidas;
