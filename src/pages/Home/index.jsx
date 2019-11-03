import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { getContratos } from "../../service/Contratos.service";
import { CoadTabs } from "../../components/Contratos/CoadTabs";
import { Row, Col } from "reactstrap";

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
            titulo1={"Visualizar meus Contratos"}
            titulo2={"Visualizar contratos SME"}
            conteudo1={
              <div>
                <Row>
                  <Col sm="12">
                    <h4>Tab 1 Contents</h4>
                  </Col>
                </Row>
              </div>
            }
            conteudo2={
              <Row>
                <Col lg="6">
                  <text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis eum, magnam totam atque, ex alias dolor voluptates
                    saepe perferendis dicta quasi harum labore? Asperiores
                    pariatur delectus iste facere beatae incidunt?
                  </text>
                </Col>
                <Col lg="6">
                  <b>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Culpa consequatur mollitia facilis accusantium ducimus
                    dolorem, quos ratione adipisci quam blanditiis soluta
                    deleniti quibusdam omnis modi eos debitis recusandae,
                    eligendi quis?
                  </b>
                </Col>
              </Row>
            }
          />
        </Container>
      </Page>
    );
  }
}
