import React from "react";
import IconeUE from "../../../assets/images/icon-und-educacional.svg";
import IconeCEU from "../../../assets/images/icon-und-centros-unificados.svg";
import IconeUA from "../../../assets/images/icon-und-administrativas.svg";
import { redirect } from "../../../utils/redirect";
import {
  Card,
  CardBody,
  CardTitle,
  CardDeck,
  CardImg,
  Row,
  Col
} from "reactstrap";

const styled = {
  cursor: "pointer"
};

const CardEquipamento = props => {
  return (
    <Row>
      <Col lg={4} xl={4}>
        <Card
          className="servico h-75"
          style={styled}
          onClick={() => redirect("#/contratos-continuos/?equipamento=UE")}
        >
          <CardImg top src={IconeUE} height="70" alt="Icone de seleção" />
          <CardBody>
            <CardTitle>Unidades Educacionais</CardTitle>
          </CardBody>
        </Card>
      </Col>
      <Col lg={4} xl={4}>
        <Card
          className="servico h-75"
          style={styled}
          onClick={() => redirect("#/contratos-continuos/?equipamento=CEU")}
        >
          <CardImg top src={IconeCEU} alt="Icone de seleção" height="70" />
          <CardBody>
            <CardTitle>Centros Educacionais Unificados</CardTitle>
          </CardBody>
        </Card>
      </Col>
      <Col lg={4} xl={4}>
        <Card
          className="servico h-75"
          style={styled}
          onClick={() => redirect("#/contratos-continuos/?equipamento=UA")}
        >
          <CardImg top src={IconeUA} alt="Icone de seleção" height="70" />
          <CardBody>
            <CardTitle>Unidades Administrativas</CardTitle>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CardEquipamento;
