import React from "react";
import { Card, CardBody, CardTitle, CardImg, Col } from "reactstrap";
import "./style.scss";
import { redirect } from "../../../utils/redirect";

const styled = {
  cursor: "pointer",
  align: "middle",
};

const CardLogo = props => {
  const rota = props.rota;
  return (
    <>
      <Col xl={5}>
        <Card
          className="servico h-75"
          style={styled}
          onClick={() => redirect(rota)}
        >
          <CardImg
            cssModule
            src={props.iconeLogo}
            height="90"
            alt="Icone de seleção"
          />
          <CardBody>
            <CardTitle>{props.titulo}</CardTitle>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default CardLogo;
