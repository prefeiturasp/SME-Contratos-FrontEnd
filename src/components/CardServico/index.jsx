import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardDeck } from "reactstrap";
import { getTiposServicoLookup } from "../../service/TiposServico.service";
import { redirect } from "../../utils/redirect";
import "./style.scss";

const styled = {
  cursor: "pointer"
};

export class CardServico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiposServico: []
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
      <CardDeck className="container-card tres-colunas">
        {tiposServico.map((tipoServico, key) => (
          <Card
            key={tipoServico.id}
            className="servico"
            style={styled}
            onClick={() =>
              redirect(`#/contratos_continuos/?tipo_servico=${tipoServico.id}`)
            }
          >
            <CardBody>
              <CardTitle>{tipoServico.nome}</CardTitle>
            </CardBody>
          </Card>
        ))}
      </CardDeck>
    );
  }
}

export default CardServico;
