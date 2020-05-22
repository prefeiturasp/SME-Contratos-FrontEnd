import React, { Component, Fragment } from "react";
import $ from "jquery";
import { Row, Col, Card, Input as InputBootStrap, Button } from "reactstrap";
import { CoadSelect } from "../../components/Contratos/CoadForm";
import { getNucleos } from "../../service/Nucleos.service";
import { getUsuariosLookup } from "../../service/Usuarios.service";
import { TabelaUnidades } from "./UnidadesEnvolvidas/TabelaUnidades";
import { FiltroUnidades } from "./UnidadesEnvolvidas/FiltroUnidades";
import { TabelaUnidadesParaSelecionar } from "./UnidadesEnvolvidas/TabelaUnidadesParaSelecionar";
import { AdicionarComplementos } from "./UnidadesEnvolvidas/AdicionarComplementos";
import "./style.scss";

export default class Gestao extends Component {
  state = {
    nucleos: [],
    usuarios: [],
    emailUsuario: null,
    unidades: null,
    todosSelecionados: false,
    nome_fiscal: null,
    suplentes: [],
    unidadesSelecionadas: [],
  };

  async componentDidMount() {
    const nucleos = await getNucleos();
    const usuarios = await getUsuariosLookup();
    this.setState({
      nucleos,
      usuarios,
      emailUsuario: this.props.contrato.gestor.email,
    });

    $("#avancar-2").click(() => {
      let error = 0;
      if (!$("[name=coordenador]").val()) {
        $("[name=coordenador]").addClass("is-invalid");
        error++;
      }
      if (!$("[name=gestor]").val()) {
        $("[name=gestor]").addClass("is-invalid");
        error++;
      }
      if (!$("[name=nucleo_responsavel]").val()) {
        $("[name=nucleo_responsavel]").addClass("is-invalid");
        error++;
      }
      if (error === 0) {
        this.props.jumpToStep(3);
      } else {
        $(".alerta").removeClass("d-none");
      }
    });
  }

  setEmailUsuario = (uuid) => {
    const { usuarios } = this.state;
    let emailUsuario = null;
    usuarios.forEach((usuario) => {
      if (usuario.uuid === uuid) {
        emailUsuario = usuario.email;
      }
    });
    this.setState({ emailUsuario });
  };

  cancelar = () => {
    this.props.cancelar();
    this.props.jumpToStep(0);
  };

  checkUnidade = (index) => {
    let { unidades } = this.state;
    unidades[index].checked = !unidades[index].checked;
    this.setState({ unidades });
  };

  setUnidades = (unidades) => {
    this.setState({ unidades });
  };

  selecionarTodos = () => {
    let { unidades, todosSelecionados } = this.state;
    todosSelecionados = !todosSelecionados;
    unidades = unidades.map((unidade) => {
      unidade.checked = todosSelecionados;
      return unidade;
    });
    this.setState({ unidades, todosSelecionados });
  };

  adicionarUnidadesSelecionadas = () => {
    const {
      unidades,
      unidadesSelecionadas,
      lote,
      rf_fiscal,
      nome_fiscal,
      suplentes,
    } = this.state;
    unidades
      .filter((unidade) => unidade.checked)
      .forEach((unidade) => {
        unidadesSelecionadas.push({
          unidade: unidade,
          lote: lote,
          rf_fiscal: rf_fiscal,
          nome_fiscal: nome_fiscal,
          suplentes: suplentes,
        });
      });
    this.setState({
      unidadesSelecionadas,
      unidades: null,
      lote: "",
      rf_fiscal: "",
      nome_fiscal: "",
      suplentes: [],
      selecionarTodos: false,
    });
    this.props.setUnidadesSelecionadas(unidadesSelecionadas);
  };

  setFiscalESuplentes = ({ lote, rf_fiscal, nome_fiscal, suplentes }) => {
    this.setState({
      lote,
      rf_fiscal,
      nome_fiscal,
      suplentes,
    });
  };

  removerUnidadeSelecionada = (key) => {
    let { unidadesSelecionadas } = this.state;
    unidadesSelecionadas.splice(key, 1);
    this.setState({ unidadesSelecionadas });
  };

  render() {
    const {
      nucleos,
      usuarios,
      emailUsuario,
      unidades,
      todosSelecionados,
      unidadesSelecionadas,
    } = this.state;
    return (
      <>
        <strong>
          <i className="fas fa-lg fa-file-signature" /> Informações
          Gestão/Unidade
        </strong>
        <Card className="my-3">
          <strong>Gestão de Contrato</strong>
          <Row>
            <Col>
              <CoadSelect label="Coordenador do Contrato" name="coordenador">
                <option value="">Selecione</option>
                {usuarios
                  ? usuarios.map((usuario, i) => (
                      <option value={usuario.uuid}>
                        {usuario.nome} ({usuario.username})
                      </option>
                    ))
                  : ""}
              </CoadSelect>
            </Col>
          </Row>
          <Row>
            <Col lg={8} xl={8}>
              <CoadSelect
                label="Gestor do Contrato"
                name="gestor"
                onBlur={(value) => this.setEmailUsuario(value.target.value)}
              >
                {usuarios
                  ? usuarios.map((usuario, i) => (
                      <option value={usuario.uuid}>
                        {usuario.nome} ({usuario.username})
                      </option>
                    ))
                  : ""}
              </CoadSelect>
            </Col>
            <Col>
              <CoadSelect label="Núcleo Responsável" name="nucleo_responsavel">
                <option value="">Selecione</option>
                {nucleos
                  ? nucleos.map((nucleo, i) => {
                      return (
                        <option key={i} value={nucleo.uuid}>
                          {nucleo.sigla} ({nucleo.divisao.sigla})
                        </option>
                      );
                    })
                  : ""}
              </CoadSelect>
            </Col>
          </Row>
          <Row>
            <Col xl={8} lg={8}>
              <label>E-mail Gestor de Contrato</label>
              <InputBootStrap
                name="email_gestor"
                disabled={true}
                placeholder="Digite e-mail de Gestor de Contrato"
                value={emailUsuario}
              />
            </Col>
            <Col>
              <label>Telefone Gestor de Contrato</label>
              <InputBootStrap
                name="email_gestor"
                disabled={true}
                placeholder="(+55) xxxxx-xxxx"
              />
            </Col>
          </Row>
        </Card>
        <Card>
          <strong className="my-2">Unidades Envolvidas</strong>
          <FiltroUnidades setUnidades={this.setUnidades} />
          <hr />
          {unidades && (
            <Fragment>
              <TabelaUnidadesParaSelecionar
                unidades={unidades}
                checkUnidade={this.checkUnidade}
                todosSelecionados={todosSelecionados}
                selecionarTodos={this.selecionarTodos}
              />
              <hr />
              <AdicionarComplementos
                adicionarUnidadesSelecionadas={
                  this.adicionarUnidadesSelecionadas
                }
                setFiscalESuplentes={this.setFiscalESuplentes}
              />
            </Fragment>
          )}
          <TabelaUnidades
            unidadesSelecionadas={unidadesSelecionadas}
            removerUnidadeSelecionada={this.removerUnidadeSelecionada}
          />
        </Card>
        <div className="alerta text-center alert alert-danger d-none">
          <strong>Para avançar, preencha os campos obrigatórios</strong>
        </div>
        <div className="d-flex flex-row-reverse mt-4">
          <Button id="avancar-2" type="button" className="btn-coad-primary">
            Avançar
          </Button>
          <Button
            className="btn-coad-background-outline mx-3"
            type="button"
            onClick={() => this.cancelar()}
            disabled={this.props.cancelamento}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => this.props.jumpToStep(1)}
            className="btn-coad-background-outline"
          >
            Voltar
          </Button>
        </div>
      </>
    );
  }
}
