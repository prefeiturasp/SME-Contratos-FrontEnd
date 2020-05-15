import React, { Component } from "react";
import $ from "jquery";
import { Row, Col, Card, Input as InputBootStrap, Button } from "reactstrap";
import { CoadSelect } from "../../components/Contratos/CoadForm";
import UnidadeEnvolvidas from "../VisualizarContrato/UnidadesEnvolvidas";
import { getNucleos } from "../../service/Nucleos.service";
import { getUsuariosLookup } from "../../service/Usuarios.service";
import { getDiretoriasRegionais } from "../../service/DiretoriasRegionais.service";
import { formatarDREs, formatarUnidades } from "./helper";
import { getEquipamentos } from "../../service/Equipamentos.service";
import "./style.scss";

export default class Gestao extends Component {
  state = {
    nucleos: [],
    usuarios: [],
    emailUsuario: null,
    dres: null,
    // filtros
    cd_equipamento: "",
    nm_equipamento: "",
    dre: "",
    tp_unidade: "",
    tp_unidade_escolar: "",
    unidades: null,
    todosSelecionados: false,
  };

  async componentDidMount() {
    const nucleos = await getNucleos();
    const usuarios = await getUsuariosLookup();
    const dres = await getDiretoriasRegionais();
    this.setState({
      nucleos,
      usuarios,
      emailUsuario: this.props.contrato.gestor.email,
      dres: formatarDREs(dres.data.results),
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

  filtrar = async () => {
    const response = await getEquipamentos(this.state);
    this.setState({ unidades: formatarUnidades(response.data.results) });
  };

  checkUnidade = (index) => {
    let { unidades } = this.state;
    unidades[index].checked = !unidades[index].checked;
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

  render() {
    const {
      dres,
      nucleos,
      usuarios,
      emailUsuario,
      tp_unidade,
      unidades,
      todosSelecionados,
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
          <strong>Unidades Envolvidas</strong>
          <div className="my-2"></div>
          <Row>
            <Col xl={3} lg={3}>
              <label>Código EOL</label>
              <InputBootStrap
                name="cd_equipamento"
                onChange={(event) =>
                  this.setState({ cd_equipamento: event.target.value })
                }
                placeholder="Código EOL da instituição"
              />
            </Col>
            <Col xl={3} lg={3}>
              <CoadSelect
                onChange={(event) => this.setState({ dre: event.target.value })}
                label="DRE"
                name="dre"
              >
                <option value="">Selecione</option>
                {dres
                  ? dres.map((dre, i) => {
                      return (
                        <option key={i} value={dre.diretoria}>
                          {dre.diretoria} - {dre.dre}
                        </option>
                      );
                    })
                  : ""}
              </CoadSelect>
            </Col>
            <Col xl={3} lg={3}>
              <CoadSelect
                onChange={(event) =>
                  this.setState({
                    tp_unidade: event.target.value,
                    tp_unidade_escolar: "",
                  })
                }
                label="Tipo de Unidade"
                name="tp_unidade"
              >
                <option value="">Selecione</option>
                <option value="UA">Unidade Administrativa</option>
                <option value="CEU">Centro Educacional Unificado - CEU</option>
                <option value="ESC">Unidades Escolares</option>
              </CoadSelect>
            </Col>
            {tp_unidade === "ESC" && (
              <Col xl={3} lg={3}>
                <CoadSelect
                  onChange={(event) =>
                    this.setState({ tp_unidade_escolar: event.target.value })
                  }
                  label="Tipo de Unidade Escolar"
                  name="tp_unidade"
                >
                  <option value="">Selecione</option>
                  <option value="EMEF">EMEF</option>
                  <option value="EMEI">EMEI</option>
                  <option value="EMEFM">EMEFM</option>
                  <option value="EMEBS">EMEBS</option>
                  <option value="CEI DIRET">CEI DIRET</option>
                  <option value="CEI INDIRET">CEI INDIRET</option>
                  <option value="CIEJA">CIEJA</option>
                  <option value="CEU EMEF">CEU EMEF</option>
                  <option value="CEU EMEI">CEU EMEI</option>
                  <option value="CEU CEI">CEU CEI</option>
                  <option value="CMCT">CMCT</option>
                  <option value="CEMEI">CEMEI</option>
                  <option value="CECI">CECI</option>
                  <option value="IF">INSTITUTO FEDERAL</option>
                </CoadSelect>
              </Col>
            )}
          </Row>
          <div className="row">
            <div className="col-6">
              <label>Nome da Unidade</label>
              <InputBootStrap
                onChange={(event) =>
                  this.setState({ nm_equipamento: event.target.value })
                }
                name="nm_equipamento"
                placeholder="Digite o nome da unidade"
              />
            </div>
            <div className="col-3 offset-3 my-auto">
              <Button
                type="button"
                onClick={() => this.filtrar()}
                className="btn-coad-primary mr-3"
              >
                Filtrar
              </Button>
              <Button
                className="btn-coad-background-outline"
                type="button"
                onClick={() => this.cancelar()}
                disabled={this.props.cancelamento}
              >
                Limpar
              </Button>
            </div>
          </div>
          <hr />
          {unidades && (
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
                        <td className="col-2">{unidade.dc_tp_equipamento}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <UnidadeEnvolvidas termo={this.props.termo} />
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
