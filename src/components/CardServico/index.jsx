import React from "react";
import { Card, CardBody, CardTitle, CardDeck } from "reactstrap";
import "./style.scss";

const CardServico = props => {
  return (
    <CardDeck className="container-card">
      <Card className="servico">
        <CardBody>
          <CardTitle>Serviço-01</CardTitle>
        </CardBody>
      </Card>
      <Card className="servico">
        <CardBody>
          <CardTitle>Serviço-02</CardTitle>
        </CardBody>
      </Card>
      <Card className="servico">
        <CardBody>
          <CardTitle>Serviço-03</CardTitle>
        </CardBody>
      </Card>
    </CardDeck>
  );
};

export default CardServico;
