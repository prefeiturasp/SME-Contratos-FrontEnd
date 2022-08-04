import React from "react";
import { Row, Col, Card } from "reactstrap";
import { formatadoMonetario, formatadorDeData } from "../../utils/formatador";
import { corDoPrazo, corDoEstado } from "./helpers";

export const formataContagemVencimento = dias => {
  switch (true) {
    case dias === undefined:
      return "";
    case dias <= 0:
      return "Zero dias";
    default:
      return `${dias} dias`;
  }
};

export default props => {
  const {
    tipoServico,
    situacaoContratual,
    estadoContrato,
    totalmensal,
    dataEncerramento,
    diasEncerramento,
  } = props;
  const styleTipoMensal = { color: "#42474A", fontWeight: "bold" };
  return (
    <Row className="w-100 cards-contratos">
      <Col sm={12} md={12} xs={12} lg={8} xl={8} className="card-servico">
        <Card size="small" className="coad-card-superior">
          <Row>
            <Col span={8}>
              <i className="fas fa-cog" /> Tipo Serviço
              <hr />
              <h1 style={styleTipoMensal}>{tipoServico}</h1>
            </Col>
            <Col span={8}>
              <i className="fas fa-dollar-sign" /> Dados Contratos
              <hr />
              <b>Situação Contratual</b>
              <h2 style={{ color: "#FF7A00", fontWeight: "bold" }}>
                {situacaoContratual}
              </h2>
              <b>Estado de Contrato:</b>{" "}
              <span
                style={{
                  color: corDoEstado(estadoContrato),
                  fontWeight: "bold",
                }}
              >
                {estadoContrato}
              </span>
            </Col>
            <Col span={8}>
              <i className="fas fa-file-alt" /> Valores
              <hr />
              <b>Mensal:</b>
              <h2 style={styleTipoMensal}>{formatadoMonetario(totalmensal)}</h2>
              <b>Total: R$ 00.000.000,00</b>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col sm={12} xs={12} md={12} xl={4} lg={4} className="card-contagem">
        <Card size="small" className="coad-card-superior">
          <Row>
            <Col>
              <i className="fas fa-stopwatch" /> Contagem Venc.
              <hr />
              <h2
                style={{
                  color: corDoPrazo(diasEncerramento),
                  fontWeight: "bold",
                }}
              >
                {formataContagemVencimento(diasEncerramento)}
              </h2>
              <br />
              <b>Data Venc.: {formatadorDeData(dataEncerramento)}</b>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
