import React from "react";
import { Card, CardBody, CardTitle, CardImg } from "reactstrap";
import IconeEducacional from "../../assets/images/icon-und-educacional.svg";
import IconeCentros from "../../assets/images/icon-und-centros-unificados.svg";
import IconeAdministrativo from "../../assets/images/icon-und-administrativas.svg";
import "./style.scss";

const CardEquipamento = props => {
  const { educacionais, centros, administrativas } = props.equipamento;
  return (
    <div className="alinhamento">
      <Card className="equipamento">
        <CardImg top src={IconeEducacional} alt="Icone de seleção" />
        <CardBody>
          <CardTitle className="equipamento-info">{educacionais}</CardTitle>
        </CardBody>
      </Card>
      <Card className="equipamento">
        <CardImg top src={IconeCentros} alt="Icone de seleção" />
        <CardBody>
          <CardTitle className="equipamento-info">{centros}</CardTitle>
        </CardBody>
      </Card>
      <Card className="equipamento">
        <CardImg top src={IconeAdministrativo} alt="Icone de seleção" />
        <CardBody>
          <CardTitle className="equipamento-info">{administrativas}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardEquipamento;
