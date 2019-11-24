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
import {
  getUnidadesByContrato,
  addUnidade
} from "../../service/UnidadeContrato.service";
import { getUrlParams } from "../../utils/params";
import { Dialog } from "primereact/dialog";

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
    dre: null,
    contrato: null
  };

  async componentDidMount() {
    const param = getUrlParams();
    const unidadesSelect = await getUnidades();
    this.setState({
      unidadesSelect,
      contrato: param.uuid
    });
    this.carregaUnidadesContrato(param.uuid);
  }

  carregaUnidadesContrato = async uuid => {
    const unidadesContrato = await getUnidadesByContrato(uuid);
    this.setState({ unidades: unidadesContrato });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  disaparecerModal = () => {
    this.setState({ modal: false });
  };

  handleAddUnidade = async () => {
    const payload = {
      contrato: this.state.contrato,
      unidade: this.state.unidade,
      valor_mensal: this.state.valorMensal,
      valor_total: this.state.valorTotal,
      lote: this.state.lote,
      dre_lote: this.state.dre
    };

    const resultado = await addUnidade(payload);
    if (resultado.uuid) {
      this.carregaUnidadesContrato(this.state.contrato);
      this.setState({
        modal: false,
        valorMensal: 0.0,
        valorTotal: 0.0,
        unidade: null,
        lote: null,
        dre: null
      });
    }
  };

  handleValorMensal = (event, maskedValue, floatValue) => {
    this.setState({ valorMensal: floatValue });
  };

  handleValorTotal = (event, maskedValue, floatValue) => {
    this.setState({ valorTotal: floatValue });
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
        <Dialog
          header="Adicionar Unidade"
          visible={modal}
          style={{ width: "70vw" }}
          modal={true}
          onHide={this.disaparecerModal}
          footer={
            <div className="py-2">
              <Button
                className="btn-coad-background-outline"
                onClick={this.disaparecerModal}
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
            </div>
          }
        >
          <div className="px-2">
            <span>Preencha os campos para adicionar unidade a tabela.</span>
            <br />
            <br />
            <Row>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Termo de Contrato</Label>
                  <Input disabled={true} value={this.props.termo} />
                </FormGroup>
              </Col>
              <Col lg={8} xl={8}>
                <FormGroup>
                  <Label>Unidade</Label>
                  <select
                    className="form-control"
                    name="unidade"
                    onChange={e => this.setState({ unidade: e.target.value })}
                  >
                    <option> -- SELECIONE A UNIDADE -- </option>
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
          </div>
        </Dialog>
        <Row>
          <Col lg={12} xl={12}>
            <DataTable value={unidades} scrollable={true} scrollHeight="250px">
              <Column field="unidade.codigo_eol" header="Código EOL" />
              <Column field="unidade.nome" header="Un. que Recebem Serviço" />
              <Column field="unidade.equipamento" header="Equip." />
              <Column field="dre_lote" header="DRE Corresp." />
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
