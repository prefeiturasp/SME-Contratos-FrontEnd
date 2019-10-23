import React from "react";
import IconeUE from "../../../assets/images/icon-und-educacional.svg";
import IconeCEU from "../../../assets/images/icon-und-centros-unificados.svg";
import IconeUA from "../../../assets/images/icon-und-administrativas.svg";
import { redirect } from "../../../utils/redirect";
import { Card, CardBody, CardTitle, CardDeck, CardImg } from "reactstrap";

const styled = {
  cursor: "pointer"
};

const CardEquipamento = props => {
  return (
    <CardDeck className="container-card">
      <Card
        className="servico"
        style={styled}
        onClick={() => redirect("#/contratos-continuos/?equipamento=UE")}
      >
        <CardImg top src={IconeUE} alt="Icone de seleção" />
        <CardBody>
          <CardTitle>Unidades Educacionais</CardTitle>
        </CardBody>
      </Card>
      <Card
        className="servico"
        style={styled}
        onClick={() => redirect("#/contratos-continuos/?equipamento=CEU")}
      >
        <CardImg top src={IconeCEU} alt="Icone de seleção" />
        <CardBody>
          <CardTitle>Centros Educacionais Unificados</CardTitle>
        </CardBody>
      </Card>
      <Card
        className="servico"
        style={styled}
        onClick={() => redirect("#/contratos-continuos/?equipamento=UA")}
      >
        <CardImg top src={IconeUA} alt="Icone de seleção" />
        <CardBody>
          <CardTitle>Unidades Administrativas</CardTitle>
        </CardBody>
      </Card>
    </CardDeck>
  );
};

export default CardEquipamento;
