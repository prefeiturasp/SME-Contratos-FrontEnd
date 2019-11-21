import React, { Component } from "react";
import { Row, Col, Card, Label, FormGroup } from "reactstrap";
import CurrencyInput from "react-currency-input";
import { DatePicker, Select, Input } from "formik-reactstrap-widgets";
import { Datepicker, Autocomplete } from "react-formik-ui";
import { CoadTextInput, CoadRadio } from "../../components/Contratos/CoadForm";
import { getTiposServicoLookup } from "../../service/TiposServico.service";
import {
  getEstadosContrato,
  getSituacoesContrato
} from "../../service/Contratos.service";
import { getEmpresasLookup } from "../../service/Empresas.service";
import ReactQuill from "react-quill";
import { Editor } from "primereact/editor";
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

  SelecionaEmpresa = value => {
    const { empresas } = this.state;
    if (empresas)
      empresas.forEach(empresa => {
        if (empresa.uuid === value) {
          this.setState({ cnpjEmpresa: empresa.cnpj });
        }
      });
  };

  render() {
    const headerTemplate = (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <button className="ql-list" aria-label="ql-list">
          <i className="fas fa-list"></i>
        </button>
        <button className="ql-bullet" aria-label="bullet">
          <i className="fas fa-list-ol"></i>
        </button>
      </span>
    );

    const {
      tipoServicos,
      estado,
      situacao,
      empresas,
      cnpjEmpresa
    } = this.state;
    return (
      <>
        <Card className="card">
          <strong className="mb-3">Informações de Contrato</strong>
          <Row>
            <Col lg={4} xl={4}>
              <Input
                name="termo_contrato"
                id="termo_contrato"
                label="Número Termo de Contrato"
                placeholder="Ex: 0000000000000"
              />
            </Col>
            <Col lg={8} xl={8}>
              <Select label="Tipo de Serviço" name="tipo_servico">
                {tipoServicos
                  ? tipoServicos.map((value, i) => {
                      return (
                        <option key={i} value={value.uuid}>
                          {value.nome}
                        </option>
                      );
                    })
                  : ""}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xl={4}>
              <CoadTextInput
                label="Número do Processo"
                name="numero_processo"
                id="numero_processo"
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
              <DatePicker
                name="data_assinatura"
                label="Data Assinatura de Contrato"
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
              />
            </Col>
            <Col lg={8} xl={8}>
              <Label>Data Ordem de Início</Label>
              <br />
              <div className="input-group">
                <Datepicker
                  name="data_ordem_inicio"
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  locale="pt-BR"
                />
                <button className="btn btn-sx btn-default border border-left-0">
                  <i className="fas fa-calendar-alt"></i>
                </button>
              </div>
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
              <Select
                label="Empresa Contratada"
                name="empresa_contratada"
                onChange={value => this.SelecionaEmpresa(value)}
              >
                {empresas
                  ? empresas.map((empresa, i) => {
                      return (
                        <option key={i} value={empresa.uuid}>
                          {empresa.nome}
                        </option>
                      );
                    })
                  : ""}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col lg={12} xl={12}>
              <FormGroup>
                <Label>CNPJ Empresa</Label>
                <input
                  className="form-control"
                  value={cnpjEmpresa}
                  disabled={true}
                  onChange={e => {
                    console.log(e.target);
                  }}
                />
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
              <FormGroup>
                <Editor
                  headerTemplate={headerTemplate}
                  style={{ height: "320px" }}
                  name="observacoes"
                  id="observacoes"
                  value={this.state.observacoes}
                  // onTextChange={(e, setFieldValue) =>
                  //   setFieldValue("observacoes", e.htmlValue)
                  // }
                  onTextChange={e=>this.setState({observacoes: e.htmlValue})}
                />
              </FormGroup>
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}
