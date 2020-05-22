import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Label, Input, FormGroup } from "reactstrap";
import CurrencyInput from "react-currency-input";
import * as R from "ramda";

const DotacaoRow = ({
  index,
  dotacao,
  alteraDescricao,
  alteraValor,
  disabled,
}) => (
  <Row>
    <Col lg={8} xl={8}>
      <FormGroup>
        <Input
          className="mb-2"
          value={dotacao.descricao}
          disabled={disabled}
          onChange={(e) => alteraDescricao(index, e.target.value)}
        />
      </FormGroup>
    </Col>
    <Col lg={4} xl={4}>
      <CurrencyInput
        disabled={disabled}
        decimalSeparator=","
        thousandSeparator="."
        prefix="R$ "
        className="form-control"
        value={dotacao.valor}
        onChange={(value, floatValue) => {
          alteraValor(index, floatValue);
        }}
      />
    </Col>
  </Row>
);

const dotacaoVazia = () => ({
  descricao: "",
  valor: "",
});

const DotacaoOrcamentaria = ({ dotacoesSalvas, disabled = false }) => {
  const [dotacoes, setDotacoes] = useState(dotacoesSalvas || [dotacaoVazia()]);
  const [erros, setErros] = useState([])

  useEffect(() => {
    atualizaErros()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dotacoes]);

  const adicionaLinha = () => {
    setDotacoes([...dotacoes, dotacaoVazia()]);
  }; 

  const removeLinha = () => {
    if(dotacoes.length > 1) {
      const alterado = dotacoes.concat().pop();
      setDotacoes(alterado);
    }else{
      setDotacoes([dotacaoVazia()])
    }
  };

  const alteraDescricao = (index, descricao) => {
    const obj = dotacoes[index];
    const arr = R.update(index, { ...obj, descricao }, dotacoes);
    setDotacoes(arr);
  };

  const alteraValor = (index, valor) => {
    const obj = dotacoes[index];
    const arr = R.update(index, { ...obj, valor }, dotacoes);
    setDotacoes(arr);
  };

  const formularioEstaLimpo = () => {
    return dotacoes.length === 1 && dotacoes[0].descricao.length === 0
  }

  const testaDuplicacao = (errosCampo, { descricao : essaDescricao }, arr) => {
    const len = arr.filter(({descricao}) => descricao === essaDescricao ).length
    if(len > 1) errosCampo.push("Valor duplicado")
  }

  const testaVazio = (errosCampo, {descricao, valor}) => {
    if(!descricao.length) errosCampo.push("Preencha uma descrição")
    if(!valor) errosCampo.push("Preencha um valor")
  }

  const atualizaErros = () => {
    console.log(dotacoes)
    const arr = Array.from(Array(dotacoes.length), () => []);
    console.log(arr)
    dotacoes.forEach((dotacao, index) => {
      testaDuplicacao(arr[index], dotacao, dotacoes);
      testaVazio(arr[index], dotacao, dotacoes);
    })
    console.log(arr)
    setErros(arr);
  };
  return (
    <Fragment>
      <Row className="mb-2">
        <strong className="mb-3">Dotações orçamentárias</strong>
      </Row>
      <Row className="mb-2">
        <Col lg={8} xl={8}>
          <Label>Descrição</Label>
        </Col>
        <Col lg={4} xl={4}>
          <Label>Valor Mensal Estimado</Label>
        </Col>
      </Row>

      {dotacoes.map((el, i) => (
          <DotacaoRow
            key={i}
            index={i}
            dotacao={el}
            alteraDescricao={alteraDescricao}
            alteraValor={alteraValor}
            disabled={disabled}
          />
        ))}

      <Row className="mt-3">
      <Col sm={12} md={4} lg={4}  xl={6}></Col>
      <Col sm={12} md={4} lg={4} xl={3} className="text-right">
        <button
          type="button"
          className="btn btn-link coad-color font-weight-bold"
          onClick={adicionaLinha}
          disabled={disabled}
        >
          Adicionar Dotação
        </button>
        </Col>
        <Col sm={12} md={4} lg={4} xl={3} className="text-center">
        <button
          type="button"
          className="btn btn-link coad-color font-weight-bold"
          onClick={removeLinha}
          disabled={disabled || formularioEstaLimpo()}
        >
          Remover Dotação
        </button>
       </Col>
      </Row>
      <Row className="mt-3mb-2">
        <strong className="mb-3">Valor Total</strong>
      </Row>
      <Row className="mb-2">
        <Col>
          <Label>Valor Total do Contrato</Label>
        </Col>
      </Row>
      <Row>
    <Col>
      <CurrencyInput
        decimalSeparator=","
        thousandSeparator="."
        prefix="R$ "
        className="form-control"
        value={""}
        onChange={(value, floatValue) => {
          //
        }}
      />
    </Col>
  </Row>
    </Fragment>
  );
};

export default DotacaoOrcamentaria;
