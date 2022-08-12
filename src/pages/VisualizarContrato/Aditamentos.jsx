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
} from "../../service/Aditamentos.service";
import useToast from "../../hooks/useToast";
import { Dialog } from "primereact/dialog";
import { SelecionaData } from "../../components/Contratos/SelecionaData";

export default ({ contrato }) => {
  const [aditamento, setAditamento] = useState(null);
  const [objetos, setObjetos] = useState([]);
  const [modalCancelar, setModalCancelar] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const buscaObjetos = async () => {
      let obj = await getObjetosAditamentos();
      setObjetos(obj);
    };

    buscaObjetos();
  }, []);

  const cancelarAditamento = () => {
    toast.showSuccess("Aditamento cancelado com sucesso!");
    setAditamento(null);
    setModalCancelar(false);
  };

  const salvarAditamento = async () => {
    let payload = { ...aditamento };
    payload.contrato = contrato.uuid;
    if (payload.data_final)
      payload.data_final = moment(payload.data_final).format("yyyy-MM-DD");
    if (payload.data_inicial)
      payload.data_inicial = moment(payload.data_inicial).format("yyyy-MM-DD");
    const resultado = await createAditamento(payload);
    if (resultado.uuid) {
      toast.showSuccess("Aditamento gravado com sucesso!");
      setAditamento(null);
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
      {!aditamento && (
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

      {aditamento && (
        <>
          <Row>
            <Col lg={12} xl={12}>
              <h5>
                <span>Cadastro de novo aditamento:</span>
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
                onClick={() => salvarAditamento()}
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
