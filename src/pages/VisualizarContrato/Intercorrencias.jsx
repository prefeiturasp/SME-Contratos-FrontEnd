import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { Row, Col, Label } from "reactstrap";
import moment from "moment";
import useToast from "../../hooks/useToast";
import { Dialog } from "primereact/dialog";
import { SelecionaData } from "../../components/Contratos/SelecionaData";
import { Dropdown } from "primereact/dropdown";
import { REFERENCIA_ENCERRAMENTO } from "../../configs/config.constants";
import { RadioButton } from "primereact/radiobutton";
import {
  createIntercorrencia,
  getMotivosIntercorrencia,
} from "../../service/Intercorrencias.service";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import EditorHeader from "../../components/Shared/EditorHeader";

const tipoIntercorrenciaOptions = [
  { label: "Suspensão", value: "SUSPENSAO" },
  { label: "Impedimento", value: "IMPEDIMENTO" },
  { label: "Rescisão", value: "RESCISAO" },
];

const { DATA_ASSINATURA, DATA_ORDEM_INICIO } = REFERENCIA_ENCERRAMENTO;

const opcoesSuspensao = [
  "Situação de emergência ou calamidade pública",
  "Conveniência da Administração Pública",
  "A suspensão da execução do contrato por prazo superior a 120 dias, ou repetidas suspensões que totalizem o mesmo prazo.",
  "Atraso superior a 90 dias dos pagamentos devidos pela Administração",
];

export default ({ contrato }) => {
  const [intercorrencia, setIntercorrencia] = useState(null);
  const [diferenca, setDiferenca] = useState(0);
  const [motivos, setMotivos] = useState([{}]);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [modalSalvar, setModalSalvar] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const buscaMotivos = async () => {
      let response = await getMotivosIntercorrencia();
      let obj = response.map(x => ({ label: x.nome, value: x.id }));
      setMotivos(obj);
    };

    buscaMotivos();
  }, []);

  const cancelarIntercorrencia = () => {
    toast.showSuccess("Intercorrência cancelada com sucesso!");
    setIntercorrencia(null);
    setModalCancelar(false);
  };

  const getPayload = () => {
    let payload = { ...intercorrencia };
    payload.contrato = contrato.uuid;
    if (payload.data_final)
      payload.data_final = moment(payload.data_final).format("YYYY-MM-DD");
    if (payload.data_inicial)
      payload.data_inicial = moment(payload.data_inicial).format("YYYY-MM-DD");
    return payload;
  };

  const salvarIntercorrencia = async () => {
    let payload = getPayload();
    const resultado = await createIntercorrencia(payload);
    if (resultado.uuid) {
      toast.showSuccess("Intercorrência gravado com sucesso!");
      setIntercorrencia(null);
    } else {
      toast.showError("Ocorreu um erro, tente novamente!");
    }
  };

  const retornaDataInicioContrato = () => {
    if (contrato.referencia_encerramento === DATA_ASSINATURA)
      return contrato.data_assinatura;
    if (contrato.referencia_encerramento === DATA_ORDEM_INICIO)
      return contrato.data_ordem_inicio;
  };

  const calculaDiferenca = (data_inicio, data_fim) => {
    if (data_inicio && data_fim) {
      let inicio = moment(data_inicio);
      let fim = moment(data_fim);

      let diferenca = fim.diff(inicio, "days") + 1;
      setDiferenca(diferenca);
    }
  };

  const retornaDataEncerramento = () => {
    return intercorrencia.acrescentar_dias
      ? moment(contrato.dataEncerramento, "DD/MM/YYYY")
          .add("days", diferenca)
          .format("DD/MM/YYYY")
      : contrato.dataEncerramento;
  };

  const validaCampos = () => {
    let desabilitar = false;
    desabilitar =
      intercorrencia.tipo_intercorrencia &&
      intercorrencia.data_inicial &&
      intercorrencia.data_final &&
      intercorrencia.motivo_suspensao &&
      intercorrencia.descricao_suspensao;
    if (
      intercorrencia.motivo_suspensao === motivos[0].value ||
      intercorrencia.motivo_suspensao === motivos[1].value
    )
      desabilitar = desabilitar && intercorrencia.opcao_suspensao;
    return !desabilitar;
  };

  return (
    <div className="form-aditamentos">
      {!intercorrencia && (
        <Row>
          <Col lg={12} xl={12}>
            <div className="text-center w-100 mt-4 mb-4">
              <button
                className="btn btn-coad-background-outline"
                onClick={() =>
                  setIntercorrencia({
                    objeto_aditamento: [],
                  })
                }
              >
                + Adicionar Intercorrência
              </button>
            </div>
          </Col>
        </Row>
      )}

      {intercorrencia && (
        <>
          <Row>
            <Col lg={12} xl={12}>
              <h5>
                <span>Cadastro de nova intercorrência:</span>
              </h5>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xl={4} className="mt-3">
              <Label>Tipo de Intercorrência</Label>
              <Dropdown
                options={tipoIntercorrenciaOptions}
                value={intercorrencia.tipo_intercorrencia}
                onChange={e => {
                  setIntercorrencia({
                    ...intercorrencia,
                    tipo_intercorrencia: e.target.value,
                  });
                }}
                placeholder="Selecione um Tipo"
                className="w-100"
              />
            </Col>
            {intercorrencia.tipo_intercorrencia === "SUSPENSAO" && (
              <>
                <Col lg={4} xl={4} className="mt-3">
                  <Label>DE</Label>
                  <br />
                  <SelecionaData
                    className="w-100"
                    placeholder={"Selecione uma data"}
                    data={intercorrencia.data_inicial}
                    minDate={retornaDataInicioContrato()}
                    maxDate={intercorrencia.data_final}
                    onSelect={e => {
                      setIntercorrencia({
                        ...intercorrencia,
                        data_inicial: e.value,
                      });
                      calculaDiferenca(e.value, intercorrencia.data_final);
                    }}
                  />
                </Col>
                <Col lg={4} xl={4} className="mt-3">
                  <Label>ATÉ</Label>
                  <br />
                  <SelecionaData
                    className="w-100"
                    placeholder={"Selecione uma data"}
                    data={intercorrencia.data_final}
                    minDate={intercorrencia.data_inicial}
                    maxDate={contrato.data_encerramento}
                    onSelect={e => {
                      setIntercorrencia({
                        ...intercorrencia,
                        data_final: e.value,
                      });

                      calculaDiferenca(intercorrencia.data_inicial, e.value);
                    }}
                  />
                </Col>
              </>
            )}
          </Row>

          {intercorrencia.data_inicial && intercorrencia.data_final && (
            <>
              <Row className="mt-3 dias-suspensao">
                <span className="font-weight-bold">
                  Deseja acrescentar os dias de suspensão ao prazo de
                  encerramento do contrato?
                </span>
                <span className="texto-suspensao">
                  {diferenca} dias de suspensão
                </span>
              </Row>

              <Row>
                <Col lg={6} xl={6} className="mt-3">
                  <div
                    className={`check-objeto ${
                      intercorrencia.acrescentar_dias === true ? "checked" : ""
                    }`}
                  >
                    <RadioButton
                      inputId="acrescentar"
                      value={true}
                      onChange={e =>
                        setIntercorrencia({
                          ...intercorrencia,
                          acrescentar_dias: e.value,
                        })
                      }
                      checked={intercorrencia.acrescentar_dias === true}
                    />
                    <label className="mb-0 ml-2 w-75" htmlFor="acrescentar">
                      Sim, acrescentar dias de suspensão ao prazo final.
                    </label>
                  </div>
                </Col>
                <Col lg={6} xl={6} className="mt-3">
                  <div
                    className={`check-objeto ${
                      intercorrencia.acrescentar_dias === false ? "checked" : ""
                    }`}
                  >
                    <RadioButton
                      inputId="nao_acrescentar"
                      value={false}
                      onChange={e =>
                        setIntercorrencia({
                          ...intercorrencia,
                          acrescentar_dias: e.value,
                        })
                      }
                      checked={intercorrencia.acrescentar_dias === false}
                    />
                    <label className="mb-0 ml-2 w-75" htmlFor="nao_acrescentar">
                      Não, manter data de encerramento atual.
                    </label>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={4} xl={4} className="mt-3">
                  <Label>Data de Encerramento do Contrato</Label>
                  <br />
                  <InputText
                    className={
                      "w-100 " + (intercorrencia.acrescentar_dias ? "red" : "")
                    }
                    value={retornaDataEncerramento()}
                    disabled={true}
                  />
                </Col>
                <Col lg={8} xl={8} className="mt-3">
                  <Label>Motivo da Suspensão Contratual</Label>
                  <Dropdown
                    options={motivos}
                    value={intercorrencia.motivo_suspensao}
                    onChange={e => {
                      setIntercorrencia({
                        ...intercorrencia,
                        motivo_suspensao: e.target.value,
                      });
                    }}
                    placeholder="Selecione um Motivo"
                    className="w-100"
                  />
                </Col>
              </Row>
            </>
          )}

          {intercorrencia.motivo_suspensao === motivos[0].value && (
            <Row>
              <Col lg={6} xl={6} className="mt-3">
                <div
                  className={`check-objeto ${
                    intercorrencia.opcao_suspensao === opcoesSuspensao[0]
                      ? "checked"
                      : ""
                  }`}
                >
                  <RadioButton
                    inputId="opcao1"
                    value={opcoesSuspensao[0]}
                    onChange={e =>
                      setIntercorrencia({
                        ...intercorrencia,
                        opcao_suspensao: e.value,
                      })
                    }
                    checked={
                      intercorrencia.opcao_suspensao === opcoesSuspensao[0]
                    }
                  />
                  <label className="mb-0 ml-2 w-75" htmlFor="opcao1">
                    {opcoesSuspensao[0]}
                  </label>
                </div>
              </Col>
              <Col lg={6} xl={6} className="mt-3">
                <div
                  className={`check-objeto ${
                    intercorrencia.opcao_suspensao === opcoesSuspensao[1]
                      ? "checked"
                      : ""
                  }`}
                >
                  <RadioButton
                    inputId="opcao2"
                    value={opcoesSuspensao[1]}
                    onChange={e =>
                      setIntercorrencia({
                        ...intercorrencia,
                        opcao_suspensao: e.value,
                      })
                    }
                    checked={
                      intercorrencia.opcao_suspensao === opcoesSuspensao[1]
                    }
                  />
                  <label className="mb-0 ml-2 w-75" htmlFor="opcao2">
                    {opcoesSuspensao[1]}
                  </label>
                </div>
              </Col>
            </Row>
          )}
          {intercorrencia.motivo_suspensao === motivos[1].value && (
            <Row>
              <Col lg={6} xl={6} className="mt-3">
                <div
                  className={`check-objeto ${
                    intercorrencia.opcao_suspensao === opcoesSuspensao[2]
                      ? "checked"
                      : ""
                  }`}
                >
                  <RadioButton
                    inputId="opcao3"
                    value={opcoesSuspensao[2]}
                    onChange={e =>
                      setIntercorrencia({
                        ...intercorrencia,
                        opcao_suspensao: e.value,
                      })
                    }
                    checked={
                      intercorrencia.opcao_suspensao === opcoesSuspensao[2]
                    }
                  />
                  <label className="mb-0 ml-2 w-75" htmlFor="opcao3">
                    {opcoesSuspensao[2]}
                  </label>
                </div>
              </Col>
              <Col lg={6} xl={6} className="mt-3">
                <div
                  className={`check-objeto ${
                    intercorrencia.opcao_suspensao === opcoesSuspensao[3]
                      ? "checked"
                      : ""
                  }`}
                >
                  <RadioButton
                    inputId="opcao4"
                    value={opcoesSuspensao[3]}
                    onChange={e =>
                      setIntercorrencia({
                        ...intercorrencia,
                        opcao_suspensao: e.value,
                      })
                    }
                    checked={
                      intercorrencia.opcao_suspensao === opcoesSuspensao[3]
                    }
                  />
                  <label className="mb-0 ml-2 w-75" htmlFor="opcao4">
                    {opcoesSuspensao[3]}
                  </label>
                </div>
              </Col>
            </Row>
          )}

          {intercorrencia.motivo_suspensao && (
            <Row>
              <Col lg={12} xl={12} className="mt-3">
                <Label>Descreva o motivo da suspensão contratual:</Label>
                <Editor
                  style={{ height: "120px" }}
                  value={intercorrencia.descricao_suspensao}
                  headerTemplate={<EditorHeader />}
                  onTextChange={value =>
                    setIntercorrencia({
                      ...intercorrencia,
                      descricao_suspensao: value.htmlValue,
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
                onClick={() => setModalSalvar(true)}
                disabled={validaCampos()}
              >
                Salvar Intercorrencia
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
                  onClick={() => cancelarIntercorrencia()}
                >
                  Sim
                </button>
              </div>
            }
          >
            Deseja cancelar o preenchimento da intercorrência?
            <br />
            Os dados inseridos serão removidos
          </Dialog>

          <Dialog
            header="Registro de Intercorrência"
            visible={modalSalvar}
            style={{ width: "50vw" }}
            modal={true}
            onHide={() => setModalSalvar(false)}
            footer={
              <div className="mb-2">
                <button
                  className="btn btn-coad-background-outline"
                  onClick={() => setModalSalvar(false)}
                >
                  Voltar
                </button>
                <button
                  className="btn btn-coad-primary"
                  onClick={() => salvarIntercorrencia()}
                >
                  Confirmo
                </button>
              </div>
            }
          >
            {intercorrencia.acrescentar_dias ? (
              <span>
                Ao registrar essa intercorrência, o contrato será{" "}
                <strong>suspenso</strong> e a contagem do{" "}
                <strong>prazo de vencimento alterada</strong>. Os dias de
                interrupção serão acrescidos ao prazo de encerramento do
                contrato.
              </span>
            ) : (
              <span>
                Ao registrar essa intercorrência, o contrato será{" "}
                <strong>suspenso</strong> e a contagem do{" "}
                <strong>prazo de vencimento mantida</strong>. Os dias de
                interrupção não serão acrescidos ao prazo de encerramento do
                contrato.
              </span>
            )}
            <br />
            <strong>Você confirma o registro da intercorrência?</strong>
          </Dialog>
        </>
      )}
    </div>
  );
};
