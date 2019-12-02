import React, { Component } from "react";
import { Row, Col, Button, FormGroup, Input, Label } from "reactstrap";
import { DataTable, Column } from "primereact/datatable";
import { Button as AntButton } from 'antd';
import { getUnidades, getUnidade } from "../../service/Unidades.service";
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
    contrato: null,
    codigo_eol: "",
    unidadeNome: "",
    unidadeEquipamento: "",
    unidadeDRE: ""
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

  novaUnidade = () => {
    this.toggle();
    this.setState({
      unidade: null,
      valor_mensal: 0.00,
      valor_total: 0.00,
      lote: null
    });
  };

  disaparecerModal = () => {
    this.resetForm()
    this.setState({ modal: false });
  };

  handleAddUnidade = async () => {
    const payload = {
      contrato: this.state.contrato,
      unidade: this.state.unidade,
      valor_mensal: this.state.valorMensal,
      valor_total: this.state.valorTotal,
      lote: this.state.lote
    };

    const resultado = await addUnidade(payload);
    if (resultado.uuid) {
      this.carregaUnidadesContrato(this.state.contrato);
      this.resetForm()
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

  handleOnChangeCodigoEol = async (event) => {
    const codigoEol = event.target.value
    if (codigoEol.length >= 6) {
      const unidade = await getUnidade(codigoEol)
      this.setState(
        {
          unidade: unidade.uuid,
          unidadeNome: unidade.nome,
          unidadeEquipamento: unidade.equipamento,
          unidadeDRE: unidade.dre ? unidade.dre.nome : "Sem DRE vinculada"
        } 
      )
    }

    this.setState({ codigo_eol: codigoEol})
  }

  resetForm = () => {
    this.setState({ 
      codigo_eol: "",
      unidadeNome: "",
      unidadeEquipamento: "",
      unidadeDRE: "",
      lote: ""
    })
  }

  render() {
    const {
      unidades,
      modal,
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
                  <Label>Código EOL</Label>
                  <Input placeholder="Digite o código EOL" value={this.state.codigo_eol} onChange={this.handleOnChangeCodigoEol.bind(this)} />
                </FormGroup>
              </Col>
              <Col lg={8} xl={8}>
                <FormGroup>
                  <Label>Unidade que Recebe Serviço</Label>
                  <Input disabled={true} value={this.state.unidadeNome} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Lote Correspondente</Label>
                  <Input
                    value={this.state.lote}
                    placeholder="Digite Número do Lote"
                    onChange={e => this.setState({ lote: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Equipamento</Label>
                  <Input
                    value={this.state.unidadeEquipamento}
                    disabled={true}
                    placeholder="Equipamento Correspondente"
                  />
                </FormGroup>
              </Col>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>DRE Correspondente</Label>
                  <Input
                    value={this.state.unidadeDRE}
                    disabled={true}
                    placeholder=""
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
              <Column field="unidade.dre.nome" header="DRE Corresp." />
              <Column field="lote" header="Lote Corresp." />
            </DataTable>
            <AntButton 
                style={{marginTop: '5px'}}
                type="link" 
                disabled={disabilitado}
                size="small"
                onClick={this.novaUnidade}
            >
                Adicionar Unidade
            </AntButton>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UnidadeEnvolvidas;
