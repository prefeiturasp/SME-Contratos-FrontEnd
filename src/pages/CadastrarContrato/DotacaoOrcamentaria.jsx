import React, { useState, useEffect, useImperativeHandle, Fragment } from "react";
import { Row, Col, Label, Input, FormGroup } from "reactstrap";
import CurrencyInput from "react-currency-input";
import * as R from "ramda";

const ERRO_MSG = {
  duplicado: "Dotações orçamentárias: descrição duplicada.",
  semDescricao: "Dotações orçamentárias: descrição não foi informada.",
  semValor: "Dotações orçamentárias: valor mensal estimado não foi informado.",
}

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
          value={dotacao.dotacao_orcamentaria}
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
  dotacao_orcamentaria: "",
  valor: "",
});


const dropLastIfEmpty = (arr1, arr2) => {
  if(!arr1.length) return arr1;
  const filtered = arr1.map(R.pick(["dotacao_orcamentaria", "valor"]))
  if(Object.values(filtered[filtered.length -1]).every(el => !el)) return R.dropLast(1, arr2 || arr1)
  return arr1
}

const DotacaoOrcamentaria = React.forwardRef(({ valorTotalSalvo, dotacoesSalvas, disabled = false }, ref) => {
  const [valorTotal, setValorTotal] = useState(valorTotalSalvo || 0) 
  const [dotacoes, setDotacoes] = useState( dotacoesSalvas || [dotacaoVazia()]);
  const [erros, setErros] = useState([])

  React.useEffect(() => {
    if(dotacoesSalvas && dotacoesSalvas.length) setDotacoes(dotacoesSalvas)
    if(valorTotalSalvo) setValorTotal(valorTotalSalvo)
}, [dotacoesSalvas, valorTotalSalvo])

  useImperativeHandle(ref, () => ({
    getState: () => {
      return { valorTotal, dotacoes: dropLastIfEmpty(dotacoes) }
    },
    getError: () => {
      if(erros.flat().some(el => /duplica/gi.test(el))) return ERRO_MSG.duplicado;
      if(erros.flat().some(el => /descri/gi.test(el)))  return ERRO_MSG.semDescricao;
      if(erros.flat().some(el => /valor/gi.test(el))) return ERRO_MSG.semValor;
      return "";
    }
  }), [valorTotal, dotacoes, erros]);

  useEffect(() => {
    atualizaErros()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dotacoes]);

  const adicionaLinha = () => {
    setDotacoes([...dotacoes, dotacaoVazia()]);
  }; 

  const removeLinha = () => {
    if(dotacoes.length > 1) {
      setDotacoes(R.dropLast(1, dotacoes));
    }else{
      setDotacoes([dotacaoVazia()])
    }
  };

  const alteraDescricao = (index, descricao) => {
    const obj = dotacoes[index];
    const arr = R.update(index, { ...obj, dotacao_orcamentaria: descricao }, dotacoes);
    setDotacoes(arr);
  };

  const alteraValor = (index, valor) => {
    const obj = dotacoes[index];
    const arr = R.update(index, { ...obj, valor }, dotacoes);
    setDotacoes(arr);
  };

  const formularioEstaLimpo = () => {
    return dotacoes.length === 1 && dotacoes[0].dotacao_orcamentaria.length === 0
  }

  const testaDuplicacao = (errosCampo, { dotacao_orcamentaria : current }, arr) => {
    if(!current.length) return
    const len = arr.filter(({dotacao_orcamentaria}) => dotacao_orcamentaria === current ).length
    if(len > 1) errosCampo.push("Valor duplicado")
  }

  const testaVazio = (errosCampo, {dotacao_orcamentaria, valor}) => {
    if(!dotacao_orcamentaria.length) errosCampo.push("Preencha uma descrição")
    if(!valor) errosCampo.push("Preencha um valor")
  }

  const atualizaErros = () => {
    const arr = Array.from(Array(dotacoes.length), () => []);
    dotacoes.forEach((dotacao, index) => {
      testaDuplicacao(arr[index], dotacao, dotacoes);
      testaVazio(arr[index], dotacao, index === dotacoes.length - 1);
    })
    setErros(dropLastIfEmpty(dotacoes, arr));
  };
  return (
    <Fragment>
      <Row className="mb-2">
        <strong className="mb-3">Dotações Orçamentárias</strong>
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
        <strong className="mb-3">Valor Total do Contrato</strong>
      </Row>
      <Row className="mb-2">
      </Row>
      <Row>
    <Col>
      <CurrencyInput
      disabled={disabled}
        decimalSeparator=","
        thousandSeparator="."
        prefix="R$ "
        className="form-control"
        value={valorTotal}
        onChange={(value, floatValue) => {
          setValorTotal(floatValue)
          //
        }}
      />
    </Col>
  </Row>
    </Fragment>
  );
});

export default DotacaoOrcamentaria;
