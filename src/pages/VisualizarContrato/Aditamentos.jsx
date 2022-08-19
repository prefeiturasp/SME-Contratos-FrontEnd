import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Editor } from "primereact/editor";
import { InputMask } from "primereact/inputmask";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input";
import { Row, Col, Label } from "reactstrap";
import moment from "moment";
import EditorHeader from "../../components/Shared/EditorHeader";
import {
  getObjetosAditamentos,
  createAditamento,
  excluiAditamento,
  alteraAditamento,
} from "../../service/Aditamentos.service";
import useToast from "../../hooks/useToast";
import { Dialog } from "primereact/dialog";
import { SelecionaData } from "../../components/Contratos/SelecionaData";
import { formatadoMonetario } from "../../utils/formatador";

export default ({ contrato }) => {
  const [aditamento, setAditamento] = useState(null);
  const [aditamentos, setAditamentos] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);
  const [uuidDelecao, setUuidDelecao] = useState(null);
  const [edicao, setEdicao] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const buscaObjetos = async () => {
      let obj = await getObjetosAditamentos();
      setObjetos(obj);
    };

    buscaObjetos();
    setAditamentos(contrato.aditamentos);
  }, [contrato.aditamentos]);

  const cancelarAditamento = () => {
    toast.showSuccess("Aditamento cancelado com sucesso!");
    setAditamento(null);
    setModalCancelar(false);
  };

  const getPayload = () => {
    let payload = { ...aditamento };
    payload.contrato = contrato.uuid;
    if (payload.data_final)
      payload.data_final = moment(payload.data_final).format("YYYY-MM-DD");
    if (payload.data_inicial)
      payload.data_inicial = moment(payload.data_inicial).format("YYYY-MM-DD");
    return payload;
  };

  const salvarAditamento = async () => {
    let payload = getPayload();
    const resultado = await createAditamento(payload);
    if (resultado.uuid) {
      toast.showSuccess("Aditamento gravado com sucesso!");
      setAditamento(null);
      setAditamentos([...aditamentos, resultado]);
    } else {
      toast.showError("Ocorreu um erro, tente novamente!");
    }
  };

  const editarAditamento = async () => {
    let payload = getPayload();
    const resultado = await alteraAditamento(payload);
    if (resultado.data.uuid) {
      toast.showSuccess("Aditamento gravado com sucesso!");
      setAditamento(null);
      let newAditamentos = [...aditamentos];
      let index = newAditamentos.findIndex(
        obj => obj.uuid === resultado.data.uuid,
      );
      newAditamentos[index] = resultado.data;
      setAditamentos(newAditamentos);
    } else {
      toast.showError("Ocorreu um erro, tente novamente!");
    }
  };

  const mostrarDatasEValores = () => {
    let obj = aditamento.objeto_aditamento.filter(obj =>
      [
        "PRORROGACAO_VIGENCIA_CONTRATUAL",
        "MODIFICACAO_PROJETO_ESPECIFICACOES",
        "MODIFICACAO_VALOR_CONTRATUAL",
      ].includes(obj),
    );
    return obj.length > 0;
  };

  const mostrarValorTotal = () => {
    return aditamento.objeto_aditamento.includes(
      "MODIFICACAO_VALOR_CONTRATUAL",
    );
  };

  const deletaAditamento = async uuid => {
    const resultado = await excluiAditamento(uuid);
    if (resultado) {
      toast.showSuccess(
        "O contrato retornou para a situação anterior.",
        "Aditamento deletado com sucesso!",
      );
      let newAditamentos = [...aditamentos];
      newAditamentos = newAditamentos.filter(adit => adit.uuid !== uuid);
      setAditamentos([...newAditamentos]);
      setModalDeletar(false);
    } else {
      toast.showError("Ocorreu um erro, tente novamente!");
    }
  };

  const validaCampos = () => {
    let desabilitar = false;
    desabilitar =
      aditamento.termo_aditivo &&
      aditamento.objeto_aditamento.length > 0 &&
      aditamento.razoes_aditamento;
    if (mostrarDatasEValores())
      desabilitar =
        desabilitar &&
        aditamento.data_final &&
        aditamento.data_inicial &&
        aditamento.valor_mensal_atualizado &&
        aditamento.valor_total_atualizado;
    if (mostrarValorTotal())
      desabilitar = desabilitar && aditamento.valor_aditamento;
    return !desabilitar;
  };

  return (
    <div className="form-aditamentos">
      {!aditamento && aditamentos.length === 0 && (
        <Row>
          <Col lg={12} xl={12}>
            <div className="text-center w-100 mt-4 mb-4">
              <button
                className="btn btn-coad-background-outline"
                onClick={() =>
                  setAditamento({
                    objeto_aditamento: [],
                  })
                }
              >
                + Adicionar Termo de Aditamento
              </button>
            </div>
          </Col>
        </Row>
      )}

      {!aditamento && aditamentos.length > 0 && (
        <>
          <Row className="mb-3">
            <Col lg={12} className="d-flex flex-row-reverse pr-0">
              <Button
                className="btn btn-coad-background-outline"
                onClick={() =>
                  setAditamento({
                    objeto_aditamento: [],
                  })
                }
              >
                Novo Aditamento
              </Button>
            </Col>
          </Row>
          {aditamentos.map((adit, index) => (
            <div key={index}>
              {index !== 0 && <hr className="mt-4 mb-4" />}
              <Row className="mb-3">
                <Col lg={6} className="pl-0">
                  <div className="titulo-termo">
                    Termo aditivo nº: {adit.termo_aditivo}
                  </div>
                </Col>
                <Col lg={6} className="d-flex flex-row-reverse pr-0">
                  <Button
                    className="btn btn-coad-background-outline"
                    onClick={() => {
                      setModalDeletar(true);
                      setUuidDelecao(adit.uuid);
                    }}
                    tooltip="Excluir"
                    tooltipOptions={{ position: "top" }}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                  <Button
                    onClick={() => {
                      let newAdit = adit;
                      newAdit.objeto_aditamento = newAdit.objeto_aditamento.map(
                        obj => obj.id,
                      );
                      if (newAdit.valor_aditamento)
                        newAdit.valor_aditamento = parseFloat(
                          newAdit.valor_aditamento,
                        );
                      if (newAdit.valor_mensal_atualizado)
                        newAdit.valor_mensal_atualizado = parseFloat(
                          newAdit.valor_mensal_atualizado,
                        );
                      if (newAdit.valor_total_atualizado)
                        newAdit.valor_total_atualizado = parseFloat(
                          newAdit.valor_total_atualizado,
                        );
                      if (newAdit.data_inicial)
                        newAdit.data_inicial = moment(
                          newAdit.data_inicial,
                          "yyyy-MM-DD",
                        ).toDate();
                      if (newAdit.data_final)
                        newAdit.data_final = moment(
                          newAdit.data_final,
                          "yyyy-MM-DD",
                        ).toDate();
                      setAditamento(adit);
                      setEdicao(true);
                    }}
                    className="btn btn-coad-background-outline mx-2"
                    tooltip="Editar"
                    tooltipOptions={{ position: "top" }}
                  >
                    <i className="fas fa-pencil-alt" />
                  </Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <div className="tabela-aditamentos">
                  <div className="grid-row">
                    {adit.data_inicial && (
                      <div className="grid-item">
                        <p className="titulo-item">Atualizar a partir DE:</p>
                        <span className="conteudo-item">
                          {moment(adit.data_inicial).format("DD/MM/yyyy")}
                        </span>
                      </div>
                    )}
                    {adit.data_final && (
                      <div className="grid-item">
                        <p className="titulo-item">ATÉ:</p>
                        <span className="conteudo-item">
                          {moment(adit.data_final).format("DD/MM/yyyy")}
                        </span>
                      </div>
                    )}
                    {adit.valor_mensal_atualizado && (
                      <div className="grid-item">
                        <p className="titulo-item">Valor mensal atualizado:</p>
                        <span className="conteudo-item">
                          {formatadoMonetario(adit.valor_mensal_atualizado)}
                        </span>
                      </div>
                    )}
                    {adit.valor_total_atualizado && (
                      <div className="grid-item">
                        <p className="titulo-item">Valor total atualizado:</p>
                        <span className="conteudo-item">
                          {formatadoMonetario(adit.valor_total_atualizado)}
                        </span>
                      </div>
                    )}
                    {adit.valor_aditamento && (
                      <div className="grid-item">
                        <p className="titulo-item">Valor do aditamento:</p>
                        <span className="conteudo-item">
                          {formatadoMonetario(adit.valor_aditamento)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="grid-row">
                    <div className="grid-item">
                      <p className="titulo-item">Objeto do termo aditivo:</p>
                      <span className="conteudo-item">
                        {adit.objeto_aditamento.map((objeto, index) => (
                          <p className="mb-0" key={index}>
                            {objeto.nome}
                          </p>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="grid-row">
                    <div className="grid-item">
                      <p className="titulo-item">Razões do aditamento:</p>
                      <span
                        className="conteudo-item"
                        dangerouslySetInnerHTML={{
                          __html: adit.razoes_aditamento,
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </Row>
              <Dialog
                header="Remover aditivo"
                visible={modalDeletar}
                style={{ width: "50vw" }}
                modal={true}
                onHide={() => setModalDeletar(false)}
                footer={
                  <div className="mb-2">
                    <button
                      className="btn btn-coad-background-outline"
                      onClick={() => setModalDeletar(false)}
                    >
                      Não
                    </button>
                    <button
                      className="btn btn-coad-primary"
                      onClick={() => deletaAditamento(uuidDelecao)}
                    >
                      Sim
                    </button>
                  </div>
                }
              >
                Deseja remover esse aditivo do contrato?
              </Dialog>
            </div>
          ))}
        </>
      )}

      {aditamento && (
        <>
          <Row>
            <Col lg={12} xl={12}>
              <h5>
                <span>
                  {edicao ? "Edição de" : "Cadastro de novo"} aditamento:
                </span>
              </h5>
            </Col>
          </Row>
          <Row>
            <Col lg={6} xl={6} className="mt-3">
              <Label>Nº do Termo Aditivo</Label>
              <InputMask
                className="w-100"
                mask="*****/9999"
                value={aditamento.termo_aditivo || ""}
                onChange={e =>
                  setAditamento({
                    ...aditamento,
                    termo_aditivo: e.target.value,
                  })
                }
                autoClear={false}
                placeholder="Ex.: XXXXX/0000"
              />
            </Col>
          </Row>

          <Row>
            <Col lg={12} xl={12} className="mt-3">
              <Label>Selecione o(s) Objeto(s) do Termo Aditivo:</Label>
              {objetos.map((obj, index) => {
                return (
                  <div
                    className={`check-objeto ${
                      aditamento.objeto_aditamento.includes(obj.id)
                        ? "checked"
                        : ""
                    }`}
                    key={index}
                  >
                    <Checkbox
                      inputId={obj.id}
                      value={obj.id}
                      onChange={e => {
                        let objSelecionados = [...aditamento.objeto_aditamento];
                        if (e.checked)
                          objSelecionados = [
                            ...aditamento.objeto_aditamento,
                            e.value,
                          ];
                        else {
                          objSelecionados = aditamento.objeto_aditamento.filter(
                            val => val !== e.value,
                          );
                        }
                        setAditamento({
                          ...aditamento,
                          objeto_aditamento: objSelecionados,
                        });
                      }}
                      checked={aditamento.objeto_aditamento.includes(obj.id)}
                    />
                    <label htmlFor={obj.id} className="p-checkbox-label">
                      {obj.nome}
                    </label>
                  </div>
                );
              })}
            </Col>
          </Row>

          {mostrarDatasEValores() && (
            <Row>
              <Col lg={4} xl={4} className="mt-3">
                <Label>Atualizar a partir DE</Label>
                <br />
                <SelecionaData
                  className="w-100"
                  placeholder={"De"}
                  data={aditamento.data_inicial}
                  maxDate={aditamento.data_final}
                  onSelect={e => {
                    setAditamento({
                      ...aditamento,
                      data_inicial: e,
                    });
                  }}
                />
              </Col>
              <Col lg={4} xl={4} className="mt-3">
                <Label>ATÉ</Label>
                <br />
                <SelecionaData
                  className="w-100"
                  placeholder={"Até"}
                  data={aditamento.data_final}
                  minDate={aditamento.data_inicial}
                  onSelect={e => {
                    setAditamento({
                      ...aditamento,
                      data_final: e,
                    });
                  }}
                />
              </Col>
            </Row>
          )}
          <Row>
            {mostrarValorTotal() && (
              <Col lg={4} xl={4} className="mt-3">
                <Label>Valor do aditamento</Label>
                <CurrencyInput
                  decimalSeparator=","
                  thousandSeparator="."
                  prefix="R$ "
                  className="form-control"
                  allowNegative={true}
                  value={aditamento.valor_aditamento}
                  onChange={(value, floatValue) => {
                    setAditamento({
                      ...aditamento,
                      valor_aditamento: floatValue,
                    });
                  }}
                />
              </Col>
            )}
            {mostrarDatasEValores() && (
              <>
                <Col lg={4} xl={4} className="mt-3">
                  <Label>Valor mensal atualizado</Label>
                  <CurrencyInput
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$ "
                    className="form-control"
                    value={aditamento.valor_mensal_atualizado}
                    onChange={(value, floatValue) => {
                      setAditamento({
                        ...aditamento,
                        valor_mensal_atualizado: floatValue,
                      });
                    }}
                  />
                </Col>
                <Col lg={4} xl={4} className="mt-3">
                  <Label>Valor total atualizado</Label>
                  <CurrencyInput
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$ "
                    className="form-control"
                    value={aditamento.valor_total_atualizado}
                    onChange={(value, floatValue) => {
                      setAditamento({
                        ...aditamento,
                        valor_total_atualizado: floatValue,
                      });
                    }}
                  />
                </Col>
              </>
            )}
          </Row>

          {aditamento.objeto_aditamento.length > 0 && (
            <Row>
              <Col lg={12} xl={12} className="mt-3">
                <Label>Descreva brevemente as razões do aditamento:</Label>
                <Editor
                  style={{ height: "120px" }}
                  value={aditamento.razoes_aditamento}
                  headerTemplate={<EditorHeader />}
                  onTextChange={value =>
                    setAditamento({
                      ...aditamento,
                      razoes_aditamento: value.htmlValue,
                    })
                  }
                />
              </Col>
            </Row>
          )}

          <Row className="my-4">
            <Col lg={12} className="d-flex flex-row-reverse">
              <Button
                className="btn btn-coad-primary"
                onClick={() =>
                  edicao ? editarAditamento() : salvarAditamento()
                }
                disabled={validaCampos()}
              >
                Salvar Aditamento
              </Button>
              <Button
                onClick={() => setModalCancelar(true)}
                className="btn btn-coad-background-outline mx-2"
              >
                Cancelar
              </Button>
            </Col>
          </Row>

          <Dialog
            header="Cancelar preenchimento"
            visible={modalCancelar}
            style={{ width: "50vw" }}
            modal={true}
            onHide={() => setModalCancelar(false)}
            footer={
              <div className="mb-2">
                <button
                  className="btn btn-coad-background-outline"
                  onClick={() => setModalCancelar(false)}
                >
                  Não
                </button>
                <button
                  className="btn btn-coad-primary"
                  onClick={() => cancelarAditamento()}
                >
                  Sim
                </button>
              </div>
            }
          >
            Deseja cancelar o Cadastro de Aditamento?
          </Dialog>
        </>
      )}
    </div>
  );
};
