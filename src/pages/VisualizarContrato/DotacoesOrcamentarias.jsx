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
            filter
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
                value={dotacao.valor}
                onChange={(value, floatValue) => {
                  dotacao.valor = floatValue;
                  setDotacoes(dotacoes);
                }}
              />
            </Col>
            <Col lg={1} xl={1}>
              <Button
                className="btn btn-coad-background-outline btn-empenho"
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
                className="btn btn-coad-background-outline btn-empenho"
                onClick={() => {
                  dotacao.empenhos = dotacao.empenhos
                    ? [...dotacao.empenhos, {}]
                    : [{}];
                  setDotacoes(dotacoes);
                }}
                disabled={disabled}
              >
                Adicionar Empenho
              </Button>
            </Col>
          </Row>

          {dotacao.empenhos &&
            dotacao.empenhos.map((empenho, indexEmp) => (
              <Row key={indexEmp}>
                <Col lg={5} xl={5}>
                  <Label form="numeroProcesso">Número do Empenho</Label>
                  <InputText
                    value={empenho.numero}
                    className="w-100"
                    onChange={e => {
                      empenho.numero = e.target.value;
                      setDotacoes(dotacoes);
                    }}
                    disabled={disabled}
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
                    className="btn btn-coad-background-outline btn-empenho"
                    onClick={() => {
                      let dotacoesCopy = dotacoes;
                      dotacoesCopy[index].empenhos.splice(indexEmp, 1);
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
