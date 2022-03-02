import React from "react";
import { Card, CardBody, CardTitle, CardImg } from "reactstrap";
import "./style.scss";

const CardSection = props => {
  return (
    <div className="section">
      <Card>
        <CardBody>
          <CardImg
            id="img-cardsection"
            top
            src={props.icone}
            alt="icone seleção"
          />
          <CardTitle className="texto-cardsection">{props.titulo}</CardTitle>
          {props.children}
        </CardBody>
      </Card>
    </div>
  );
};

export default CardSection;
