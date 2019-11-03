import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { getContratos } from "../../service/Contratos.service";
import { CoadTabs } from "../../components/Contratos/CoadTabs";
import {Row, Col} from 'reactstrap';

export const Conteudo1 = props => {
  return (<Row>
    <Col sm="12">
      <h4>Tab 1 Contents</h4>
    </Col>
  </Row>)
}

export const Conteudo2 = props => {
  return (<Row>
    <Col sm="12">
      <h4>Tab 2 Contents</h4>
    </Col>
  </Row>)
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contratos: [],
      filtros: {
        gestor: "",
        empresa_contratada: "",
        encerramento_de: "",
        encerramento_ate: "",
        equipamento: "",
        estado_contrato: "",
        situacao: "",
        termo_Contrato: "",
        tipo_servico: ""
      }
    };
  }

  async onBuscarClick(filtros) {
    this.setState({ filtros });

    const contratos = await getContratos(filtros);
    this.setState({ contratos });
  }

  render() {
    return (
      <Page titulo="Painel Princpal">
        <Container subtitulo="Painel Principal" icone="pi pi-chart-bar">
          <hr />
          <p>Aqui será o painel principal do sistema.</p>
          <CoadTabs
            titulo1={"Titulo 1"}
            titulo2={"Titulo 2"}
            conteudo1={<Conteudo1 />}
            conteudo2={<Conteudo2 />}
          />
        </Container>
      </Page>
    );
  }
}
