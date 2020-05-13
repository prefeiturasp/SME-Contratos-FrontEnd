import React, { Component } from "react";
import $ from "jquery";
import { Row, Col, Card, Input as InputBootStrap, Button } from "reactstrap";
import { CoadSelect } from "../../components/Contratos/CoadForm";
import UnidadeEnvolvidas from "../VisualizarContrato/UnidadesEnvolvidas";
import { getNucleos } from "../../service/Nucleos.service";
import { getUsuariosLookup } from "../../service/Usuarios.service";
import { getDiretoriasRegionais } from "../../service/DiretoriasRegionais.service";
import { formatarDREs } from "./helper";
import { getEquipamentos } from "../../service/Equipamentos.service";

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
  };

  render() {
    const { dres, nucleos, usuarios, emailUsuario } = this.state;
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
                  this.setState({ tp_unidade: event.target.value })
                }
                label="Tipo de Unidade"
                name="tp_unidade"
              >
                <option value="">Selecione</option>
                <option value="UA">Unidade Administrativa</option>
                <option value="CEU">Centro Educacional Unificado - CEU</option>
                <option value="">Unidades Escolares</option>
              </CoadSelect>
            </Col>
            <Col xl={3} lg={3}>
              <CoadSelect
                onChange={(event) =>
                  this.setState({ tp_unidade: event.target.value })
                }
                label="Tipo de Unidade Escolar"
                name="tp_unidade"
              >
                <option value="">Selecione</option>
                <option value="EMEF">EMEF</option>
                <option value="EMEFM">EMEFM</option>
                <option value="EMEBS">EMEBS/EMEE</option>
                <option value="CIEJA">CIEJA</option>
                <option value="EMEI">EMEI</option>
                <option value="CEMEI">CEMEI</option>
                <option value="CEI">CEI</option>
                <option value="CECI">CECI</option>
                <option value="CMCT">CMCT</option>
                <option value="IF">INSTITUTO FEDERAL</option>
              </CoadSelect>
            </Col>
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
