import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Label,
  FormGroup,
  Input as InputBootstrap,
  Button
} from "reactstrap";
import CurrencyInput from "react-currency-input";
import {
  CoadTextInput,
  CoadRadio,
  CoadEditor,
  CoadCalendar,
  CoadSelect
} from "../../components/Contratos/CoadForm";
import { getTiposServicoLookup } from "../../service/TiposServico.service";
import {
  getEstadosContrato,
  getSituacoesContrato
} from "../../service/Contratos.service";
import { getEmpresasLookup } from "../../service/Empresas.service";
import { Field } from "formik";
export default class Informacoes extends Component {
  state = {
    situacao: [],
    estado: [],
    data_assinatura: null,
    data_ordem_inicio: null,
    empresa_contratada: null,
    observacoes: null,
    tipoServicos: [],
    empresas: [],
    cnpjEmpresa: null
  };

  async componentDidMount() {
    const tipoServicos = await getTiposServicoLookup();
    const estado = await getEstadosContrato();
    const situacao = await getSituacoesContrato();
    const empresas = await getEmpresasLookup();
    this.setState({ tipoServicos, estado, situacao, empresas });
  }

  SelecionaEmpresa = event => {
    const { empresas } = this.state;
    const value = event.target.value;
    if (empresas)
      empresas.forEach(empresa => {
        if (empresa.uuid === value) {
          this.setState({ cnpjEmpresa: empresa.cnpj });
        }
      });
  };

  render() {
    const {
      tipoServicos,
      estado,
      situacao,
      empresas,
      cnpjEmpresa
    } = this.state;
    return (
      <>
        <strong>
          <i className="fas fa-lg fa-file-signature" /> Informações
          Contrato/Empresa
        </strong>
        <Card className="mt-3">
          <Row>
            <Col lg={4} xl={4}>
              <CoadTextInput
                name="termo_contrato"
                id="termo_contrato"
                label="Número Termo de Contrato"
                placeholder="Ex: 00/00"
                disabled={true}
              />
            </Col>
            <Col lg={8} xl={8}>
              <CoadSelect label="Tipo de Serviço" name="tipo_servico">
                <option>Selecione</option>
                {tipoServicos
                  ? tipoServicos.map((value, i) => {
                      return (
                        <option key={i} value={value.uuid}>
                          {value.nome}
                        </option>
                      );
                    })
                  : ""}
              </CoadSelect>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xl={4}>
              <CoadTextInput
                label="Número do Processo"
                name="processo"
                id="processo"
                placeholder="Ex: 0000000000000"
                type="text"
              />
            </Col>
            <Col lg={8} xl={8}>
              <Label className="pb-2">Estado Contrato</Label>
              <br />
              {estado.map((value, i) => (
                <CoadRadio
                  type="radio"
                  name="estado_contrato"
                  value={value.id}
                  label={value.nome}
                  key={i}
                />
              ))}
            </Col>
          </Row>

          <Row>
            <Col lg={4} xl={4}>
              <CoadTextInput
                label="Número do Edital"
                name="numero_edital"
                id="numero_edital"
                placeholder="Ex: 0000000000000"
                type="text"
              />
            </Col>
            <Col lg={8} xl={8}>
              <Label className="pb-2">Situação de Contrato</Label>
              <br />
              {situacao.map((value, i) => (
                <CoadRadio
                  label={value.nome}
                  name="situacao"
                  type="radio"
                  value={value.id}
                  key={i}
                />
              ))}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg={4} xl={4}>
              <Field
                component={CoadCalendar}
                name="data_assinatura"
                id="data_assinatura"
                label="Data Assinatura de Contrato"
              />
            </Col>
            <Col lg={8} xl={8}>
              <Field
                component={CoadCalendar}
                name="data_ordem_inicio"
                id="data_ordem_inicio"
                label="Data Ordem de Início"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} xl={4}>
              <CoadTextInput
                name="vigencia_em_dias"
                label="Vigência de Contrato"
                type="text"
                id="vigencia_em_dias"
                placeholder="Ex: 365 dias"
              />
            </Col>
            <Col lg={8} xl={8}>
              <CoadTextInput
                label="Data Encerramento de Contrato"
                type="text"
                id="data_encerramento"
                name="data_encerramento"
                disabled={true}
                placeholder="Ex: 365 dias"
              />
            </Col>
          </Row>
        </Card>
        <Card>
          <strong className="mb-3">Empresa Contratada</strong>
          <Row>
            <Col lg={12} xl={12}>
              <CoadSelect
                label="Empresa Contratada"
                name="empresa_contratada"
                onBlur={value => this.SelecionaEmpresa(value)}
              >
                <option>Selecione</option>
                {empresas
                  ? empresas.map((empresa, i) => {
                      return (
                        <option key={i} value={empresa.uuid}>
                          {empresa.nome}
                        </option>
                      );
                    })
                  : ""}
              </CoadSelect>
            </Col>
          </Row>
          <Row>
            <Col lg={12} xl={12}>
              <FormGroup>
                <Label>CNPJ Empresa</Label>
                <InputBootstrap value={cnpjEmpresa} disabled={true} />
              </FormGroup>
            </Col>
          </Row>
        </Card>
        <Card>
          <strong className="mb-3">
            Informações Orçamentárias de Contrato
          </strong>
          <Row>
            <Col lg={8} xl={8}>
              <CoadTextInput
                label="Dotação Orçamentária"
                name="dotacao_orcamentaria"
                id="dotacao_orcamentaria"
                placeholder="Digitar dotação"
              />
              <button
                type="button"
                className="btn btn-link coad-color font-weight-bold"
              >
                Adicionar Dotação
              </button>
            </Col>
            <Col lg={4} xl={4}>
              <Label>Valor mensal do Contrato</Label>
              <CurrencyInput
                disabled={true}
                decimalSeparator=","
                thousandSeparator="."
                prefix="R$ "
                className="form-control"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={8} xl={8}></Col>
            <Col lg={4} xl={4}></Col>
          </Row>
        </Card>
        <Card>
          <strong className="mb-3">Objeto de Contrato</strong>
          <Row>
            <Col lg={12} xl={12}>
              <Field
                component={CoadEditor}
                name="objeto"
                id="objeto"
                style={{ height: "320px" }}
                label="Objeto de Contrato"
              />
            </Col>
          </Row>
        </Card>
        <div className="d-flex flex-row-reverse mt-4">
          <Button
            onClick={() => this.props.jumpToStep(1)}
            type="button"
            className="btn-coad-primary"
          >
            Avançar
          </Button>
          <Button
            onClick={() => this.props.cancelar()}
            className="btn-coad-background-outline mx-3"
          >
            Cancelar
          </Button>
          <Button disabled className="btn-coad-background-outline">
            Voltar
          </Button>
        </div>
      </>
    );
  }
}
