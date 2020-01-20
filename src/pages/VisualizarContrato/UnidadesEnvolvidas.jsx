import React, { Component } from "react";
import { Row, Col, Button, FormGroup, Input, Label } from "reactstrap";
import { DataTable, Column } from "primereact/datatable";
import { Button as AntButton } from 'antd';
import {Button as PrimeButton} from 'primereact/button';
import { getUnidades, getUnidade } from "../../service/Unidades.service";
import {
  getUnidadesByContrato,
  addUnidade,
  updateUnidade
} from "../../service/UnidadeContrato.service";
import { getUrlParams } from "../../utils/params";
import { Dialog } from "primereact/dialog";
import {getUsuarioByUserName} from '../../service/Usuarios.service'

const cursorPointer = {
  cursor: "pointer"
};
const rowsPerPage = 5;

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
    unidadeContratoUUID: null,
    fiscalTitular: {
      rf: "",
      nome: "",
      uuid: "",
      tipo_fiscal: 'TITULAR'
    },
    fiscaisSuplentes: [],
    podeAddSuplente: true,
    modalMode: '',
    headerByModalMode: {
      ADD: 'Adicionar Unidade à tabela',
      EDIT: 'Editar Unidade da tabela',
      VIEW: 'Visualizar Unidade da tabela'
    },
    loadingUnidades: true,
  };

  async componentDidMount() {
    const param = getUrlParams();
    const unidadesSelect = await getUnidades();
    this.setState({
      unidadesSelect,
      contrato: param.uuid,
    });
    this.carregaUnidadesContrato(param.uuid);
  }

  carregaUnidadesContrato = async uuid => {
    const unidadesContrato = await getUnidadesByContrato(uuid);
    this.setState({ unidades: unidadesContrato, loadingUnidades: false, });
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
      lote: null,
      modalMode: 'ADD'
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

    let resultado = null

    if (this.state.modalMode === 'ADD') {
      resultado = await addUnidade(payload);
    }
    else {
      resultado = await updateUnidade(payload, this.state.unidadeContratoUUID);
    }

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

    fiscalTitular.nome = ''
    fiscalTitular.uuid = ''

    if (rfTitular.length >= 6) {
      const titular = await getUsuarioByUserName(rfTitular)
      if (titular && titular.uuid) {
        fiscalTitular.nome = titular.nome
        fiscalTitular.uuid = titular.uuid        
      }
    }

    fiscalTitular.rf = rfTitular
    this.setState({fiscalTitular})

  }

  async handleChangeSuplente (event, idx) {
    const rfSuplente = event.target.value
    const fiscaisSuplentes = this.state.fiscaisSuplentes

    fiscaisSuplentes[idx].nome = ''
    fiscaisSuplentes[idx].uuid = ''

    if (rfSuplente.length >= 6) {
      const suplente = await getUsuarioByUserName(rfSuplente)
      if (suplente && suplente.uuid) {
        fiscaisSuplentes[idx].nome = suplente.nome
        fiscaisSuplentes[idx].uuid = suplente.uuid
      }
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

    let fiscalTitular = {
      rf: "",
      nome: "",
      uuid: "",
      tipo_fiscal: 'TITULAR'
    }
    let fiscaisSuplentes = []

    data.fiscais.forEach(
      (fiscal) => {
        if (fiscal.tipo_fiscal === 'TITULAR') {
          fiscalTitular = {
            rf: fiscal.fiscal.username,
            nome: fiscal.fiscal.nome,
            uuid: fiscal.fiscal.uuid,
            tipo_fiscal: 'TITULAR' 
          }
        }
        else {
          fiscaisSuplentes.push({
            rf: fiscal.fiscal.username,
            nome: fiscal.fiscal.nome,
            uuid: fiscal.fiscal.uuid,
            tipo_fiscal: 'SUPLENTE' 
          })

        }
      }
    )

    this.setState({
      codigo_eol: data.unidade ? data.unidade.codigo_eol : '',
      unidadeNome: data.unidade ? data.unidade.nome : '',
      unidadeEquipamento: data.unidade ? data.unidade.equipamento : '',
      unidadeDRE: data.unidade.dre ? data.unidade.dre.nome : '',
      unidadeContratoUUID: data.uuid,
      unidade: data.unidade.uuid,
      lote: data.lote,
      fiscalTitular,
      fiscaisSuplentes,
      modalMode: this.props.disabilitado ? 'VIEW' : 'EDIT'
    })
    
    this.toggle();
  };

  render() {
    const {
      unidades,
      modal,
      modalMode,
      headerByModalMode
    } = this.state;
    const { disabilitado } = this.props;
    const { loadingUnidades } = this.state;
    return (
      <div>
        <Dialog
          header={headerByModalMode[modalMode]}
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

              { !disabilitado &&
                <Button
                  danger
                  className="btn-coad-primary"
                  onClick={this.handleAddUnidade}
                >
                  Cadastrar
                </Button>
              }
            </div>
          }
        >
          <div className="px-2">
            <Row>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Código EOL</Label>
                  <Input placeholder="Digite o código EOL" value={this.state.codigo_eol} onChange={this.handleOnChangeCodigoEol.bind(this)} disabled={disabilitado} />
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
                    disabled={disabilitado}
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
            <Row>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>RF Fiscal do Contrato</Label>
                  <Input placeholder="Digite o número do RF" value={this.state.fiscalTitular.rf} onChange={(event) => this.handleChangeTitular(event)}  disabled={disabilitado}/>
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
                            <Input placeholder="Digite o número do RF" value={this.state.fiscaisSuplentes[idx].rf} onChange={(event) => this.handleChangeSuplente(event, idx)}  disabled={disabilitado}/>
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
                              disabled={disabilitado}
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
                    disabled={!this.state.podeAddSuplente || disabilitado}
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
          <Col>
            <span className="float-right">
              <PrimeButton
                disabled={disabilitado}
                icon="pi pi-file"
                type="button"
                label="Adicionar Obrigação"
                style={{ marginBottom: ".80em" }}
                onClick={this.novaUnidade}
                className="btn-coad-background-outline"
              />
            </span>
          </Col>
        </Row>        
        <Row>
          <Col lg={12} xl={12}>
            <DataTable 
              value={unidades} 
              scrollable={true} 
              scrollHeight="250px" 
              onRowClick={e => this.editUnidade(e.data)} 
              style={cursorPointer}
              paginator={unidades.length > rowsPerPage}
              rows={rowsPerPage}
              paginatorTemplate="PrevPageLink PageLinks NextPageLink"
              className="datatable-strapd-coad"
              loading={loadingUnidades}
            >
              <Column field="unidade.codigo_eol" header="Código EOL" />
              <Column field="unidade.nome" header="Un. que Recebem Serviço" />
              <Column field="unidade.equipamento" header="Equip." />
              <Column field="unidade.dre.sigla" header="DRE" />
              <Column field="lote" header="Lote Corresp." />
            </DataTable>

          </Col>
        </Row>
      </div>
    );
  }
}

export default UnidadeEnvolvidas;
