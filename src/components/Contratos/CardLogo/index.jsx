import React from "react";
import { Card, CardBody, CardTitle, Col } from "reactstrap";
import "./style.scss";
import { redirect } from "../../../utils/redirect";

const styled = {
  cursor: "pointer",
  align: "middle",
};

const CardLogo = props => {
  const rota = props.rota;
  const icon = props.iconeLogo;
  return (
    <>
      <Col xl={4}>
        <Card
          className="servico h-75"
          style={styled}
          onClick={() => redirect(rota)}
        >
          <div className="icon">
            <i className={icon} />
          </div>
          <CardBody>
            <CardTitle>{props.titulo}</CardTitle>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default CardLogo;
