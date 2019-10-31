import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input, Card } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { SelecionaTipoServico } from "../../components/Contratos/SelecionaTipoServico";
import { CALENDAR_PT } from "../../configs/config.constants";
import Radio from '../../components/Contratos/SelecionaSituacaoContrato/SituacaoRadio'

class InformacoesContrato extends Component {
  constructor(props) {
    super(props);

    this.state = {
      termo_contrato: "",
      processo: "",
      data_assinatura: "",
      data_ordem_inicio: "",
      vigencia_em_dias: "",
      data_encerramento: "",
      dias_para_o_encerramento: "",
      numeroEdital: "",
      estadoContrato: [],
      situacaoContrato: []
    };

  }
  
  
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.contrato !== this.props.contrato) {
      this.propsToState(this.props.contrato);
    }
  }

  
  componentDidMount() {
    this.setState({
      estadoContrato: this.props.estadoContrato,
      situacaoContrato: this.props.situacaoContrato,
    })
  }
  

  propsToState = props => {
    this.setState({
      termo_contrato: props.termo_contrato,
      processo: props.processo,
      data_assinatura: props.data_assinatura,
      data_ordem_inicio: props.data_ordem_inicio,
      vigencia_em_dias: props.vigencia_em_dias,
      data_encerramento: props.data_encerramento,
      dias_para_o_encerramento: props.dias_para_o_encerramento
    });
  };

  render() {
    const {
      termo_contrato,
      processo,
      data_assinatura,
      vigencia_em_dias,
      data_encerramento,
      dias_para_o_encerramento
    } = this.state;
    const {estadoContrato} = this.props;
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <FormGroup>
              <Label form="termoContrato">Número Termo de Contrato</Label>
              <InputText
                id="termoContrato"
                value={termo_contrato}
                onChange={e =>
                  this.setState({ termo_contrato: e.target.value })
                }
                placeholder={"Ex: 001/002"}
                className="w-100"
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
            <Label form="tipoServico">Tipo de Serviço</Label>
            <br />
            <SelecionaTipoServico id="tipoServico" className="w-100" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <FormGroup>
              <Label form="numeroProcesso">Número de Processo</Label>
              <InputText
                id="numeroProcesso"
                value={processo}
                onChange={e => this.setState({ processo: e.target.value })}
                placeholder={"Ex: 0000.2019/0000000-0"}
                className="w-100"
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
            <Label form="situacao">Situação de Contrato</Label>
            <br />
           <Radio />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <Label for="edital">Número do Edital</Label>
            <InputText
              id="edital"
              value={""}
              disabled
              placeholder={"Ex: 00000000"}
              className="w-100"
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
            <Label form="estado">Estado de Contrato</Label>
            <br />
            {estadoContrato.map(value => {
              return (
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="radio"
                      name="estado_contrato"
                      value={value.id}
                    />
                    {value.nome}
                  </Label>
                </FormGroup>
              );
            })}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={12} xs={12} lg={8} xl={8}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <Label>Data Assinatura de Contrato</Label>
                <br />

                <Calendar
                  value={data_assinatura}
                  onChange={e => this.setState({ data_assinatura: e.value })}
                  locale={CALENDAR_PT}
                  dateFormat="dd/mm/yy"
                  showIcon={true}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <Label>Data Ordem de Início</Label>
                <br />
                {/* <Calendar
                  value={data_ordem_inicio}
                  // onChange={e => this.setState({ dataOrdemInicio: e.value })}
                  showIcon={true}
                  locale={CALENDAR_PT}
                  dateFormat="dd/mm/yy"
                /> */}
              </Col>
            </Row>
            <Row>
              <Col sm={12} xs={12} md={12} lg={6} xl={6}>
                <FormGroup>
                  <Label for="vigencia">Vigência de Contrato</Label>
                  <InputText
                    id="vigencia"
                    value={vigencia_em_dias}
                    onChange={e =>
                      this.setState({ vigencia_em_dias: e.target.value })
                    }
                    placeholder={"Ex: 365 dias"}
                    className="w-100"
                  />
                </FormGroup>
              </Col>
              <Col sm={12} xs={12} md={12} lg={6} xl={6}>
                <Label>Data Encerramento de Contrato</Label>
                <br />
                <Calendar
                  value={data_encerramento}
                  onChange={e => this.setState({ data_encerramento: e.value })}
                  showIcon={true}
                  locale={CALENDAR_PT}
                  dateFormat="dd/mm/yy"
                />
              </Col>
            </Row>
          </Col>
          <Col sm={12} xs={12} lg={4} xl={4}>
            <Row>
              <Col>
                <Label for="dataAssinatura">Contagem Vencimento</Label>
                <br />
                <Card className="text-center p-5">
                  <h2 className="font-weight-bold text-success">
                    {dias_para_o_encerramento} dias
                  </h2>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InformacoesContrato;
