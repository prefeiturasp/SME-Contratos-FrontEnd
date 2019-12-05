import React, { Component } from "react";
import { Row, Col, Button, FormGroup, Input, Label } from "reactstrap";
import { DataTable, Column } from "primereact/datatable";
import { Button as AntButton } from 'antd';
import {Button as PrimeButton} from 'primereact/button';
import { getUnidades, getUnidade } from "../../service/Unidades.service";
import {
  getUnidadesByContrato,
  addUnidade
} from "../../service/UnidadeContrato.service";
import { getUrlParams } from "../../utils/params";
import { Dialog } from "primereact/dialog";
import {getUsuarioByUserName} from '../../service/Usuarios.service'

const cursorPointer = {
  cursor: "pointer"
};

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
    unidadeDRE: "",
    fiscalTitular: {
      rf: "",
      nome: "",
      uuid: "",
      tipo_fiscal: 'TITULAR'
    },
    fiscaisSuplentes: [],
    podeAddSuplente: true
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
    const fiscais = []

    if (this.state.fiscalTitular.uuid.length > 0){
      fiscais.push({
        fiscal: this.state.fiscalTitular.uuid,
        tipo_fiscal: this.state.fiscalTitular.tipo_fiscal
      })
    }

    this.state.fiscaisSuplentes.forEach(
      (suplente) => {
        fiscais.push({
          fiscal: suplente.uuid,
          tipo_fiscal: suplente.tipo_fiscal
        })
      }
    )
    const payload = {
      contrato: this.state.contrato,
      unidade: this.state.unidade,
      valor_mensal: this.state.valorMensal,
      valor_total: this.state.valorTotal,
      lote: this.state.lote,
      fiscais
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
      lote: "",
      fiscalTitular: {
        rf: "",
        nome: "",
        uuid: "",
        tipo_fiscal: 'TITULAR'
      },
      fiscaisSuplentes: []
    })
  }

  appendSuplente() {
    const emptySuplente = {
      rf: "",
      nome: "",
      uuid: "",
      tipo_fiscal: 'SUPLENTE'
    }

    const fiscaisSuplentes = this.state.fiscaisSuplentes

    fiscaisSuplentes.push(emptySuplente)

    this.setState(fiscaisSuplentes)

    this.setState({podeAddSuplente: fiscaisSuplentes.length < 3})

  }

  async handleChangeTitular (event) {
    const rfTitular = event.target.value
    const fiscalTitular = this.state.fiscalTitular

    if (rfTitular.length >= 6) {
      const titular = await getUsuarioByUserName(rfTitular)
      fiscalTitular.nome = titular.nome
      fiscalTitular.uuid = titular.uuid
    }

    fiscalTitular.rf = rfTitular
    this.setState({fiscalTitular})

  }

  async handleChangeSuplente (event, idx) {
    const rfSuplente = event.target.value
    const fiscaisSuplentes = this.state.fiscaisSuplentes

    if (rfSuplente.length >= 6) {
      const suplente = await getUsuarioByUserName(rfSuplente)
      fiscaisSuplentes[idx].nome = suplente.nome
      fiscaisSuplentes[idx].nome = suplente.nome
      fiscaisSuplentes[idx].uuid = suplente.uuid
    }

    fiscaisSuplentes[idx].rf = rfSuplente
    this.setState({fiscaisSuplentes})

  }

  removeSuplente(idx) {
    const fiscaisSuplentes = this.state.fiscaisSuplentes
    fiscaisSuplentes.splice(idx, 1)
    this.setState({fiscaisSuplentes})
    this.setState({podeAddSuplente: fiscaisSuplentes.length < 3})
  }

  editUnidade = (data) => {
    // console.log('Data:', data)
    // this.toggle();
  };

  render() {
    const {
      unidades,
      modal,
    } = this.state;
    const { disabilitado } = this.props;
    return (
      <div>
        <Dialog
          header="Adicionar Unidade à tabela"
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
            {/* <span>Preencha os campos para adicionar unidade a tabela.</span>
            <br />
            <br /> */}
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
            {/* <Row><Col><hr></hr></Col></Row> */}
            <Row>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>RF Fiscal do Contrato</Label>
                  <Input placeholder="Digite o número do RF" value={this.state.fiscalTitular.rf} onChange={(event) => this.handleChangeTitular(event)} />
                </FormGroup>
              </Col>
              <Col lg={8} xl={8}>
                <FormGroup>
                  <Label>Nome Fiscal do Contrato</Label>
                  <Input disabled={true} value={this.state.fiscalTitular.nome} />
                </FormGroup>
              </Col>
            </Row>

            {this.state.fiscaisSuplentes.map(
                (fiscalSuplente, idx) => {
                    return (
                      <Row>
                        <Col lg={4} xl={4}>
                          <FormGroup>
                            <Label>RF Suplente de Fiscal do Contrato</Label>
                            <Input placeholder="Digite o número do RF" value={this.state.fiscaisSuplentes[idx].rf} onChange={(event) => this.handleChangeSuplente(event, idx)} />
                          </FormGroup>
                        </Col>
                        <Col lg={6} xl={6}>
                          <FormGroup>
                            <Label>Nome Suplente Fiscal do Contrato</Label>
                            <Input disabled={true} value={this.state.fiscaisSuplentes[idx].nome} />
                          </FormGroup>
                        </Col>
                        <Col lg={2} xl={2} style={{padding: '0px', paddingRight: '15px'}}>
                          <PrimeButton
                              style={{marginTop: '33px', width: '100%'}}
                              label="Remover"
                              onClick={(e) => this.removeSuplente(idx)}
                          />
                        </Col>
                      </Row>
                    )
                }
            )}
            <div className="p-col-12" style={{padding: '0px', marginLeft: '-0.5em'}} >
                <AntButton
                    disabled={!this.state.podeAddSuplente}
                    type="link"
                    size="small"
                    onClick={(e) => this.appendSuplente()}
                >
                    Adicionar Suplente
                </AntButton>
            </div>


          </div>
        </Dialog>
        <Row>
          <Col lg={12} xl={12}>
            {/* style={cursorPointer} */}
            <DataTable value={unidades} scrollable={true} scrollHeight="250px" onRowClick={e => this.editUnidade(e.data)}>
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
