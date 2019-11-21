import React, { Component } from "react";
import { Row, Col, Card, Input as InputBootStrap } from "reactstrap";
import { Select, Input } from "formik-reactstrap-widgets";
import { CoadTextInput, CoadSelect } from "../../components/Contratos/CoadForm";
import UnidadeEnvolvidas from "../VisualizarContrato/UnidadesEnvolvidas";
import { getNucleos } from "../../service/Nucleos.service";
import { getUsuariosLookup } from "../../service/Usuarios.service";

export default class Gestao extends Component {
  state = {
    nucleos: [],
    usuarios: [],
    emailUsuario: null
  };

  async componentDidMount() {
    const nucleos = await getNucleos();
    const usuarios = await getUsuariosLookup();
    this.setState({ nucleos, usuarios });
  }

  setEmailUsuario = uuid => {
    const { usuarios } = this.state;
    let emailUsuario = null;
    usuarios.map(usuario => {
      if (usuario.uuid === uuid) {
        emailUsuario = usuario.email;
      }
    });
    this.setState({ emailUsuario });
  };

  render() {
    const { nucleos, usuarios, emailUsuario } = this.state;
    return (
      <>
        <strong>
          <i className="fas fa-lg fa-file-signature" /> Informações
          Gestão/Unidade
        </strong>
        <Card className="mt-3">
          <strong>Gestão de Contrato</strong>
          <Row>
            <Col lg={8} xl={8}>
              <CoadSelect
                label="Gestor do Contrato"
                name="gestor"
                onBlur={value => this.setEmailUsuario(value.target.value)}
              >
                <option>Selecione</option>
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
              <CoadSelect label="Núcleo Responsável" name="nucleo">
                <option>Selecione</option>
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
          <UnidadeEnvolvidas />
        </Card>
      </>
    );
  }
}
