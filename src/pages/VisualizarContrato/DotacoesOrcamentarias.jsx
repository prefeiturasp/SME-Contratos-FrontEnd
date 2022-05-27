import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect } from "react";
import CurrencyInput from "react-currency-input";
import { Row, Col, Label } from "reactstrap";
import SelecionaDotacaoOrcamentaria from "../../components/Contratos/SelecionaDotacaoOrcamentaria";

export default ({
  disabled,
  dotacoes,
  setDotacoes,
  valorTotal,
  setValorTotal,
}) => {
  useEffect(() => {}, []);

  return (
    <>
      <Row>
        <Col lg={6} xl={6}>
          <SelecionaDotacaoOrcamentaria
            id="dotacoes"
            className="w-100"
            value={dotacoes}
            onSelect={event => {
              setDotacoes(event.value);
            }}
            disabled={disabled}
          />
        </Col>
      </Row>

      {dotacoes.map((dotacao, index) => (
        <>
          <Row className="mt-3" key={index}>
            <Col lg={5} xl={5}>
              <Label form="numeroProcesso">Dotação Orcamentaria</Label>
              <InputText
                value={dotacao.numero_dotacao}
                className="w-100"
                disabled={true}
              />
            </Col>
            <Col lg={3} xl={3}>
              <Label form="numeroProcesso">Valor Mensal</Label>
              <CurrencyInput
                disabled={disabled}
                decimalSeparator=","
                thousandSeparator="."
                prefix="R$ "
                className="form-control"
                value={dotacao.valor_mensal}
                onChange={(value, floatValue) => {
                  dotacao.valor_mensal = floatValue;
                  setDotacoes(dotacoes);
                }}
              />
            </Col>
            <Col lg={1} xl={1}>
              <Button
                className="btn btn-coad-background-outline"
                onClick={() => {
                  let dotacoesCopy = dotacoes;
                  dotacoesCopy.splice(index, 1);
                  setDotacoes(dotacoesCopy);
                }}
                disabled={disabled}
              >
                X
              </Button>
            </Col>
            <Col lg={3} xl={3}>
              <Button
                className="btn btn-coad-background-outline"
                onClick={() => {
                  dotacao.empenho = dotacao.empenho
                    ? [...dotacao.empenho, {}]
                    : [{}];
                  setDotacoes(dotacoes);
                }}
                disabled={disabled}
              >
                + Empenho
              </Button>
            </Col>
          </Row>

          {dotacao.empenho &&
            dotacao.empenho.map((empenho, indexEmp) => (
              <Row key={indexEmp}>
                <Col lg={5} xl={5}>
                  <Label form="numeroProcesso">Número do Empenho</Label>
                  <InputText
                    value={empenho.numero_empenho}
                    className="w-100"
                    onChange={e => {
                      empenho.numero_empenho = e.target.value;
                      setDotacoes(dotacoes);
                    }}
                  />
                </Col>
                <Col lg={3} xl={3}>
                  <Label form="numeroProcesso">Valor previsto do Empenho</Label>
                  <CurrencyInput
                    disabled={disabled}
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$ "
                    className="form-control"
                    value={empenho.valor_previsto}
                    onChange={(value, floatValue) => {
                      empenho.valor_previsto = floatValue;
                      setDotacoes(dotacoes);
                    }}
                  />
                </Col>
                <Col lg={1} xl={1}>
                  <Button
                    className="btn btn-coad-background-outline"
                    onClick={() => {
                      let dotacoesCopy = dotacoes;
                      dotacoesCopy[index].empenho.splice(indexEmp, 1);
                      setDotacoes(dotacoesCopy);
                    }}
                    disabled={disabled}
                  >
                    X
                  </Button>
                </Col>
              </Row>
            ))}
        </>
      ))}

      <Row>
        <Col lg={6} xl={6} className="mt-3">
          <Label form="numeroProcesso">Valor Total do Contrato</Label>
          <CurrencyInput
            disabled={disabled}
            decimalSeparator=","
            thousandSeparator="."
            prefix="R$ "
            className="form-control"
            value={valorTotal}
            onChange={(value, floatValue) => {
              setValorTotal(floatValue);
            }}
          />
        </Col>
      </Row>
    </>
  );
};
