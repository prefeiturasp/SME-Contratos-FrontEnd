import React, { Component, Fragment } from "react";
import $ from "jquery";
import { Row, Col, Card, Input as InputBootStrap, Button } from "reactstrap";
import { CoadSelect } from "../../components/Contratos/CoadForm";
import { getNucleos } from "../../service/Nucleos.service";
import { getUsuariosLookup } from "../../service/Usuarios.service";
import { getDiretoriasRegionais } from "../../service/DiretoriasRegionais.service";
import { formatarDREs, formatarUnidades } from "./helper";
import { getEquipamentos } from "../../service/Equipamentos.service";
import { getUsuarioByUserName } from "../../service/Usuarios.service";
import "./style.scss";
import { TabelaUnidades } from "./LotesDeUnidades/TabelaUnidades";
import { FiltroUnidades } from "./LotesDeUnidades/FiltroUnidades";

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

  pesquisarRF = async (rf, key = null) => {
    if (rf && rf.length === 7) {
      const resultado = await getUsuarioByUserName(rf);
      if (resultado) {
        if (key !== null) {
          let { suplentes } = this.state;
          suplentes[key].rf = rf;
          suplentes[key].nome = resultado.nome;
          this.setState({ suplentes });
        } else {
          this.setState({
            rf_fiscal: rf,
            nome_fiscal: resultado.nome,
          });
        }
      } else {
        if (key !== null) {
          let { suplentes } = this.state;
          suplentes[key].rf = undefined;
          suplentes[key].nome = "";
          this.setState({ suplentes });
        } else {
          this.setState({
            rf_fiscal: null,
            nome_fiscal: "",
          });
        }
      }
    } else {
      if (key !== null) {
        let { suplentes } = this.state;
        suplentes[key].rf = rf;
        suplentes[key].nome = "";
        this.setState({ suplentes });
      } else {
        this.setState({
          rf_fiscal: rf,
          nome_fiscal: "",
        });
      }
    }
  };

  adicionarSuplente = () => {
    let { suplentes } = this.state;
    suplentes.push({
      nome: "",
      rf: "",
    });
    this.setState({ suplentes });
  };

  removerSuplente = (index) => {
    let { suplentes } = this.state;
    suplentes.splice(index, 1);
    this.setState({ suplentes });
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
      nome_fiscal,
      suplentes,
      unidadesSelecionadas,
      rf_fiscal,
      lote,
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
              <div className="tabela-unidades">
                <label htmlFor="check" className="checkbox-label">
                  <input
                    type="checkbox"
                    name="check"
                    checked={todosSelecionados}
                  />
                  <span
                    onClick={() => this.selecionarTodos()}
                    className="checkbox-custom"
                  />{" "}
                  <span className="text">Selecionar todos</span>
                </label>
                <table>
                  <thead>
                    <tr className="row">
                      <th className="col-2">Código EOL</th>
                      <th className="col-3">Nome da Unidade</th>
                      <th className="col-3">Endereço</th>
                      <th className="col-2">DRE</th>
                      <th className="col-2">Tipo de Unidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unidades.map((unidade, key) => {
                      return (
                        <tr key={key} className="row">
                          <td className="col-2">
                            <label htmlFor="check" className="checkbox-label">
                              <input
                                type="checkbox"
                                name="check"
                                checked={unidade.checked}
                              />
                              <span
                                onClick={() => this.checkUnidade(key)}
                                className="checkbox-custom"
                              />{" "}
                              <span className="text">
                                {unidade.cd_equipamento}
                              </span>
                            </label>
                          </td>
                          <td className="col-3">{unidade.nm_equipamento}</td>
                          <td className="col-3">
                            {unidade.logradouro}, {unidade.bairro}
                          </td>
                          <td className="col-2">
                            {unidade.nm_exibicao_diretoria_referencia}
                          </td>
                          <td className="col-2">
                            {unidade.cd_tp_equipamento === 3 &&
                            unidade.cd_tp_ua === 19
                              ? "CEU"
                              : unidade.dc_tp_equipamento}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <hr />
              <div className="adicionar-complementos">
                <div className="title font-weight-bold">
                  Adicionar Complemento na Lista de Unidades do Filtro
                </div>
                <div className="row pt-3">
                  <div className="col-4">
                    <label>Lote</label>
                    <InputBootStrap
                      name="lote"
                      value={lote}
                      onChange={(event) =>
                        this.setState({ lote: event.target.value })
                      }
                      placeholder="Lote das unidades"
                    />
                  </div>
                  <div className="col-4">
                    <label>RF do Fiscal do Contrato</label>
                    <InputBootStrap
                      name="rf_fiscal"
                      value={rf_fiscal}
                      onChange={(event) => this.pesquisarRF(event.target.value)}
                      placeholder="RF do Fiscal"
                    />
                  </div>
                  <div className="col-4">
                    <label>Nome do Fiscal do Contrato</label>
                    <InputBootStrap
                      value={nome_fiscal}
                      name="nome_fiscal"
                      disabled
                    />
                  </div>
                </div>
                {suplentes.map((suplente, key) => {
                  return (
                    <div key={key} className="row pt-2">
                      <div className="col-4">
                        <label>RF do Suplente</label>
                        <InputBootStrap
                          name="rf"
                          onChange={(event) =>
                            this.pesquisarRF(event.target.value, key)
                          }
                          placeholder="RF do Suplente"
                        />
                      </div>
                      <div className="col-4">
                        <label>Nome do Suplente</label>
                        <InputBootStrap
                          value={suplente.nome}
                          name="nome"
                          disabled
                        />
                      </div>
                      <div className="col-4 mt-auto">
                        <Button
                          type="button"
                          onClick={() => this.removerSuplente(key)}
                          className="btn-coad-primary"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <div className="row">
                  <div className="col-4">
                    <Button
                      onClick={() => this.adicionarSuplente()}
                      type="button"
                      className="btn-coad-primary mt-3"
                    >
                      Adicionar suplente
                    </Button>
                  </div>
                  <div className="col-4 offset-4">
                    <Button
                      onClick={() => this.adicionarUnidadesSelecionadas()}
                      type="button"
                      className="btn-coad-primary mt-3"
                      disabled={!lote || !nome_fiscal}
                    >
                      Adicionar complemento
                    </Button>
                  </div>
                </div>
              </div>
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
