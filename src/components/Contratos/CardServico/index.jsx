import React, { Component } from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { getTiposServicoLookup } from "../../../service/TiposServico.service";
import { redirect } from "../../../utils/redirect";
import "./style.scss";

const styled = {
  cursor: "pointer",
};

export class CardServico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiposServico: [],
    };
  }

  setaTodosTiposServico() {
    getTiposServicoLookup().then(tiposServico => {
      this.setState({ tiposServico });
    });
  }

  componentDidMount() {
    this.setaTodosTiposServico();
  }

  render() {
    const { tiposServico } = this.state;
    return (
      <Row>
        {tiposServico.map((tipoServico, key) => {
          return (
            <Col lg={4} xl={4} md={6}>
              <Card
                key={tipoServico.id}
                className="servico h-75"
                style={styled}
                onClick={() =>
                  redirect(
                    `#/contratos-continuos/?tipo_servico=${tipoServico.id}`,
                  )
                }
              >
                <CardBody>
                  <CardTitle>{tipoServico.nome}</CardTitle>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default CardServico;
