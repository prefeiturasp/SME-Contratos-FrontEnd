import React, {
  useState,
  useEffect,
  Fragment,
  useCallback,
  useRef,
} from "react";
import { FormGroup, Label, Card, Button as ButtonBootstrap } from "reactstrap";
import moment from "moment";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { Editor } from "primereact/editor";
import { RadioButton } from "primereact/radiobutton";
import EditorHeader from "../../components/Shared/EditorHeader";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { CALENDAR_PT } from "../../configs/config.constants";
import { addLocale } from "primereact/api";
import Grupo from "./Grupo";
import { Button as AntButton, Switch } from "antd";
import {
  criaEdital,
  alteraEdital,
  excluiEdital,
} from "../../service/Editais.service";
import { criaTipoServico } from "../../service/TiposServico.service";
import { BAD_REQUEST, CREATED, OK, NO_CONTENT } from "http-status-codes";
import { redirect } from "../../utils/redirect";
import { getUrlParams } from "../../utils/params";
import { Row, Col } from "reactstrap";
import * as R from "ramda";
import CoadAccordion from "../../components/Global/CoadAccordion";
import { SelecionaTipoServico } from "../../components/Contratos/SelecionaTipoServico";
import {
  SUBTIPOS_DISPENSA,
  SUBTIPOS_INEXIGIBILIDADE,
  SUBTIPOS_LICITACAO,
  TIPOS_CONTRATACAO,
  STATUS_EDITAL,
} from "./constantes";
import useToast from "../../hooks/useToast";
import "./styles.scss";
import { ModalHistoricoEdital } from "./ModalHistoricoEdital";
import $ from "jquery";

const Edital = ({ mostraAlerta, edital: _edital }) => {
  addLocale("pt", CALENDAR_PT);
  const [visivel, setVisivel] = useState(false);
  const [visivelCancelar, setVisivelCancelar] = useState(false);
  const [edital, setEdital] = useState(_edital || {});
  const [modoVisualizacao, setModoVisualizacao] = useState(true);
  const [incluir, setIncluir] = useState(true);
  const [modalExcluir, setmodalExcluir] = useState(false);
  const [modalDuplicar, setmodalDuplicar] = useState(false);
  const [modalCadastrarObjeto, setModalCadastrarObjeto] = useState(false);
  const [modalHistorico, setModalHistorico] = useState(false);
  const [novoObjeto, setNovoObjeto] = useState("");
  const tipoServico = useRef(null);
  const toast = useToast();

  useEffect(() => {
    setEdital(_edital);
  }, [_edital]);

  useEffect(() => {
    const parametro = getUrlParams();
    if (!parametro.uuid) {
      setIncluir(false);
      setModoVisualizacao(false);
    }
  }, [edital]);

  const habilitarEdicao = () => {
    setModoVisualizacao(!modoVisualizacao);
    $(".ql-editor").prop("contenteditable", modoVisualizacao.toString());
  };

  const fechaDialog = () => {
    setVisivel(false);
  };

  const exibeDialog = () => {
    setVisivel(true);
  };

  const editaGrupo = (index, grupo) => {
    if (edital.grupos_de_obrigacao) {
      edital.grupos_de_obrigacao[index] = grupo;
    } else {
      edital.grupos_de_obrigacao = [];
      edital.grupos_de_obrigacao[index] = grupo;
    }
    setEdital({ ...edital });
  };

  const addGrupo = () =>
    setEdital({
      ...edital,
      grupos_de_obrigacao: R.append({ nome: "" }, edital.grupos_de_obrigacao),
    });

  const excluirGrupo = index => {
    setEdital({
      ...edital,
      grupos_de_obrigacao: R.remove(index, 1, edital.grupos_de_obrigacao),
    });
  };

  const formatarEdital = () => {
    let novoEdital = { ...edital };
    novoEdital.tipo_contratacao = novoEdital.tipo_contratacao.id;
    novoEdital.data_homologacao = moment(edital.data_homologacao).format(
      "YYYY-MM-DD",
    );
    novoEdital.objeto = novoEdital.objeto.uuid;
    novoEdital.status = novoEdital.status.id;
    return novoEdital;
  };

  const confirmarEdital = async () => {
    let editalFormatado = formatarEdital();
    const resultado = await criaEdital(editalFormatado);
    if (resultado.status === CREATED) {
      toast.showSuccess("Edital criado com sucesso");
      redirect("#/listar-editais");
    }
  };

  const alterarEdital = async () => {
    let editalFormatado = formatarEdital();
    const resultado = await alteraEdital(editalFormatado);
    if (resultado.status === OK) {
      toast.showSuccess("Edital alterado com sucesso");
      redirect("#/listar-editais");
    }
  };

  const excluirEdital = async () => {
    const resultado = await excluiEdital(edital.uuid);
    if (resultado.status === NO_CONTENT) {
      toast.showSuccess("Edital excluído com sucesso");
      redirect("#/listar-editais/");
    } else {
      toast.showError(
        "Edital não pode ser excluido! Este edital está vinculado a um ou mais contratos.",
      );
      redirect("#/listar-editais/");
    }
  };

  const duplicaEdital = async () => {
    setmodalDuplicar(false);
    const copia = R.omit(
      ["uuid", "criado_em", "alterado_em", "numero"],
      edital,
    );
    try {
      const resposta = await criaEdital({
        ...copia,
        numero: `${edital.numero} Cópia`,
      });
      if (resposta.status === CREATED) {
        setEdital(resposta.data);
        toast.showSuccess("Edital duplicado com sucesso");
        redirect(`#/edital/?uuid=${resposta.data.uuid}`);
      }
    } catch (erro) {
      if (erro.response && erro.response.status === BAD_REQUEST) {
        redirect("#/listar-editais/");
        toast.showError(
          `Erro ao duplicar: ${Object.values(erro.response.data).join("\r\n")}`,
        );
      }
    }
  };

  const CadastraObjeto = async () => {
    setModalCadastrarObjeto(false);
    try {
      const resultado = await criaTipoServico({ nome: novoObjeto });
      if (resultado.status === CREATED) {
        tipoServico.current.buscaTiposServico();
        toast.showSuccess("Objeto cadastrado com sucesso!");
      }
    } catch (erro) {
      if (erro.response && erro.response.status === BAD_REQUEST) {
        toast.showSuccess(`${Object.values(erro.response.data).join("\r\n")}`);
      }
    }

    setNovoObjeto("");
  };

  const mostraAlertaContainer = useCallback(() => {
    mostraAlerta();
  }, [mostraAlerta]);

  const semGrupoInvalido = () => {
    if (!edital.grupos_de_obrigacao) return true;
    return edital.grupos_de_obrigacao.every(el => el.nome.length);
  };

  const getSubtipos = tipoContratacao => {
    if (!tipoContratacao) return [];
    else if (tipoContratacao.id === "LICITACAO") return SUBTIPOS_LICITACAO;
    else if (tipoContratacao.id === "DISPENSA_LICITACAO")
      return SUBTIPOS_DISPENSA;
    else if (tipoContratacao.id === "INEXIGIBILIDADE_LICITACAO")
      return SUBTIPOS_INEXIGIBILIDADE;
    else return [];
  };

  const habilitaBotao =
    !modoVisualizacao &&
    edital.numero &&
    edital.processo &&
    edital.tipo_contratacao &&
    edital.subtipo &&
    edital.status &&
    edital.data_homologacao &&
    edital.objeto &&
    edital.descricao_objeto &&
    semGrupoInvalido();
  const habilitaNovoGrupo = !modoVisualizacao && semGrupoInvalido();
  const mensagemConfirmacao = incluir
    ? "Confirma a alteração deste edital?"
    : "Confirma a criação de um novo edital?";

  const footerModalExcluir = (
    <div>
      <Button
        label="Sim"
        style={{ marginRight: ".25em" }}
        onClick={excluirEdital}
        className="btn-coad-background-outline"
      />

      <Button
        label="Não"
        style={{ marginRight: ".25em" }}
        onClick={() => setmodalExcluir(false)}
      />
    </div>
  );

  const footerModaDuplicar = (
    <div>
      <Button
        label="Sim"
        style={{ marginRight: ".25em" }}
        onClick={duplicaEdital}
        className="btn-coad-background-outline"
      />

      <Button
        label="Não"
        style={{ marginRight: ".25em" }}
        onClick={() => setmodalDuplicar(false)}
      />
    </div>
  );

  const footerModalCadastrarObjeto = (
    <div>
      <Button
        label="Cancelar"
        style={{ marginRight: ".25em" }}
        onClick={() => {
          setModalCadastrarObjeto(false);
          setNovoObjeto("");
        }}
        className="btn-coad-background-outline mx-2"
      />

      <Button
        label="Adicionar"
        style={{ marginRight: ".25em" }}
        onClick={CadastraObjeto}
        className="btn-coad-primary"
        disabled={!novoObjeto.length}
      />
    </div>
  );

  return (
    <Fragment>
      <Row className="mb-3">
        <Col lg={6}>
          <Button
            className="btn btn-coad-background-outline"
            onClick={() => setModalHistorico(true)}
          >
            <i className="fas fa-history mr-1" /> Histórico
          </Button>
        </Col>
        <Col lg={6} className="d-flex flex-row-reverse">
          <Button
            disabled={!habilitaBotao}
            className="btn-coad-primary"
            label="Salvar"
            onClick={exibeDialog}
          />
          {modoVisualizacao === false && incluir === true ? (
            <Button
              disabled={modoVisualizacao}
              className="btn-coad-background-outline mr-2"
              label="Excluir Edital"
              onClick={() => setmodalExcluir(true)}
            />
          ) : (
            ""
          )}
          {modoVisualizacao === true && incluir === true ? (
            <Button
              className="btn-coad-background-outline mr-2"
              label="Duplicar"
              onClick={() => setmodalDuplicar(true)}
            />
          ) : (
            ""
          )}
          <Button
            disabled={!habilitaBotao}
            className="btn-coad-background-outline mr-2"
            label="Cancelar"
            onClick={() => setVisivelCancelar(true)}
          />
          <ButtonBootstrap
            onClick={() => redirect("#/listar-editais")}
            className="btn-coad-blue mx-2"
          >
            <i className="fas fa-arrow-left" /> Voltar
          </ButtonBootstrap>
        </Col>
      </Row>
      <Dialog
        header={"Cancelar "}
        visible={visivelCancelar}
        style={{ width: "60vw" }}
        modal={true}
        onHide={() => setVisivelCancelar(false)}
        footer={
          <FormGroup className="pt-4 d-flex justify-content-end">
            <Button
              disabled={!habilitaBotao}
              className="btn-coad-background-outline"
              label="Sim"
              onClick={() => {
                toast.showSuccess("Alterações canceladas");
                redirect("/#/listar-editais");
              }}
            />
            <Button
              className="btn-coad-primary mx-2"
              onClick={() => setVisivelCancelar(false)}
              label="Não"
            />
          </FormGroup>
        }
      >
        <span>Deseja cancelar alterações desse edital?</span>
      </Dialog>
      <Dialog
        header={"Confirmar"}
        visible={visivel}
        style={{ width: "60vw" }}
        modal={true}
        onHide={fechaDialog}
      >
        <span>{mensagemConfirmacao}</span>
        <FormGroup className="pt-4 d-flex justify-content-end">
          <Button
            className="btn-coad-background-outline mx-2"
            onClick={fechaDialog}
            label="Não"
          />
          {!incluir ? (
            <Button
              className="btn-coad-primary"
              label="Sim"
              onClick={confirmarEdital}
            />
          ) : (
            <Button
              className="btn-coad-primary"
              label="Sim"
              onClick={alterarEdital}
            />
          )}
        </FormGroup>
      </Dialog>
      <Row>
        {incluir ? (
          <Col className="d-flex justify-content-end">
            <Label className="px-3">Modo de edição</Label>
            <Switch
              defaultChecked={!modoVisualizacao}
              onChange={() => habilitarEdicao()}
            />
          </Col>
        ) : (
          ""
        )}
      </Row>
      <br />
      <CoadAccordion titulo="Informações Gerais">
        <div className="p-grid">
          <div className="p-col-6">
            <Label className="font-weight-bold">Número do Edital</Label>
            <InputMask
              className="w-100"
              mask="********/9999"
              value={edital.numero || ""}
              onChange={e => setEdital({ ...edital, numero: e.target.value })}
              autoClear={false}
              disabled={modoVisualizacao}
              placeholder="Ex.: XXXXXXXX/XXXX"
            />
          </div>

          <div className="p-col-6">
            <Label className="font-weight-bold">Status</Label>
            <Dropdown
              className="w-100"
              optionLabel="nome"
              options={STATUS_EDITAL}
              value={edital.status}
              onChange={e => setEdital({ ...edital, status: e.target.value })}
              placeholder="Selecione o Status"
              disabled={modoVisualizacao}
            />
          </div>

          <div className="p-col-6">
            <Label className="font-weight-bold">Tipo de Contratação</Label>
            <Dropdown
              className="w-100"
              optionLabel="nome"
              options={TIPOS_CONTRATACAO}
              value={edital.tipo_contratacao}
              onChange={e =>
                setEdital({
                  ...edital,
                  tipo_contratacao: e.target.value,
                  subtipo: null,
                })
              }
              placeholder="Selecione"
              disabled={modoVisualizacao}
            />
          </div>

          <div className="p-col-12">
            {getSubtipos(edital.tipo_contratacao).map((subtipo, index) => {
              return (
                <div key={index} className="field-radiobutton mb-2">
                  <RadioButton
                    disabled={modoVisualizacao}
                    inputId={index}
                    name="subtipo"
                    value={subtipo}
                    onChange={e =>
                      setEdital({
                        ...edital,
                        subtipo: e.value,
                        outroSubtipo: false,
                      })
                    }
                    checked={edital.subtipo === subtipo}
                  />
                  <label className="mb-0 ml-2 w-75" htmlFor={index}>
                    {subtipo}
                  </label>
                </div>
              );
            })}
            {(edital.tipo_contratacao === TIPOS_CONTRATACAO[1] ||
              edital.tipo_contratacao === TIPOS_CONTRATACAO[2]) && (
              <>
                <div className="field-radiobutton mb-2">
                  <RadioButton
                    disabled={modoVisualizacao}
                    inputId="outro"
                    name="subtipo"
                    value={""}
                    onChange={e =>
                      setEdital({
                        ...edital,
                        subtipo: e.value,
                        outroSubtipo: true,
                      })
                    }
                    checked={edital.outroSubtipo}
                  />
                  <label className="mb-0 ml-2 w-75" htmlFor="outro">
                    Outro - Especifique com fundamento legal.
                  </label>
                </div>
                <div>
                  {edital.outroSubtipo && (
                    <InputText
                      className="w-100"
                      value={edital.subtipo || ""}
                      onChange={e =>
                        setEdital({ ...edital, subtipo: e.target.value })
                      }
                      disabled={modoVisualizacao}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <hr />

        <div className="p-grid">
          <div className="p-col-6">
            <Label className="font-weight-bold">Número do Processo</Label>
            <InputMask
              className="w-100"
              mask="9999.9999/9999999-9"
              value={edital.processo || ""}
              onChange={e => setEdital({ ...edital, processo: e.target.value })}
              autoClear={false}
              disabled={modoVisualizacao}
              placeholder="Ex.: XXXX.XXXX/XXXXXXX-X"
            />
          </div>
          <div className="p-col-6">
            <Label className="font-weight-bold">Data de Homologação</Label>
            <Calendar
              className="w-100"
              value={edital.data_homologacao}
              onChange={e =>
                setEdital({ ...edital, data_homologacao: e.target.value })
              }
              locale="pt"
              dateFormat="dd/mm/yy"
              showIcon={true}
              showButtonBar={true}
              disabled={modoVisualizacao}
            />
          </div>
        </div>
      </CoadAccordion>
      <CoadAccordion titulo="Objeto">
        <FormGroup>
          <div className="p-grid">
            <div className="p-col-6">
              <Label className="font-weight-bold">Categoria de objeto</Label>
              <SelecionaTipoServico
                className="w-100"
                tipoServico={edital.objeto}
                onSelect={e => setEdital({ ...edital, objeto: e })}
                disabled={modoVisualizacao}
                ref={tipoServico}
              />
            </div>
            <div className="p-col-6 mt-4">
              <AntButton
                className="mt-2 font-weight-bold"
                disabled={modoVisualizacao}
                type="link"
                size="small"
                onClick={() => setModalCadastrarObjeto(true)}
              >
                + Cadastrar novo
              </AntButton>
            </div>
            <div className="p-col-12">
              <Label className="font-weight-bold">
                Descreva brevemente o objeto do edital
              </Label>
              <Editor
                style={{ height: "120px" }}
                value={edital.descricao_objeto}
                headerTemplate={<EditorHeader />}
                onTextChange={value =>
                  setEdital({
                    ...edital,
                    descricao_objeto: value.htmlValue,
                  })
                }
                className="editor-coad w-100"
              />
            </div>
          </div>
        </FormGroup>
      </CoadAccordion>
      <CoadAccordion titulo="Obrigações">
        <FormGroup>
          <Label className="font-weight-bold">Grupo(s) de obrigação</Label>
          {edital.grupos_de_obrigacao ? (
            edital.grupos_de_obrigacao.map((grupo, i) => (
              <Card key={i}>
                <Grupo
                  grupo={grupo}
                  editar={editaGrupo}
                  index={i}
                  mostraAlerta={mostraAlertaContainer}
                  modoVisualizacao={modoVisualizacao}
                />
                <Row>
                  <Col className="d-flex justify-content-end">
                    <Button
                      disabled={modoVisualizacao}
                      className="btn-coad-background-outline"
                      label="Excluir grupo"
                      onClick={() => excluirGrupo(i)}
                    />
                  </Col>
                </Row>
              </Card>
            ))
          ) : (
            <Card key={0}>
              <Grupo
                grupo={{}}
                editar={editaGrupo}
                index={0}
                mostraAlerta={mostraAlertaContainer}
                modoVisualizacao={modoVisualizacao}
              />
            </Card>
          )}
          <div>
            <AntButton
              disabled={!habilitaNovoGrupo}
              type="link"
              size="small"
              onClick={addGrupo}
            >
              Adicionar novo grupo
            </AntButton>
          </div>
        </FormGroup>
      </CoadAccordion>
      <Row className="mt-3">
        <Col lg={6}>
          <Button
            className="btn btn-coad-background-outline"
            onClick={() => setModalHistorico(true)}
          >
            <i className="fas fa-history mr-1" /> Histórico
          </Button>
        </Col>
        <Col lg={6} className="d-flex flex-row-reverse">
          <Button
            disabled={!habilitaBotao}
            className="btn-coad-primary mr-1"
            label="Salvar"
            onClick={exibeDialog}
          />
          {modoVisualizacao === false && incluir === true ? (
            <Button
              disabled={modoVisualizacao}
              className="btn-coad-background-outline mr-2"
              label="Excluir Edital"
              onClick={() => setmodalExcluir(true)}
            />
          ) : (
            ""
          )}
          {modoVisualizacao === true && incluir === true ? (
            <Button
              className="btn-coad-background-outline mr-2"
              label="Duplicar"
              onClick={() => setmodalDuplicar(true)}
            />
          ) : (
            ""
          )}

          <Button
            disabled={!habilitaBotao}
            className="btn-coad-background-outline mr-2"
            label="Cancelar"
            onClick={() => setVisivelCancelar(true)}
          />

          <ButtonBootstrap
            onClick={() => redirect("#/listar-editais")}
            className="btn-coad-blue mx-2"
          >
            <i className="fas fa-arrow-left" /> Voltar
          </ButtonBootstrap>
        </Col>
      </Row>
      <Dialog
        header="Excluir"
        visible={modalExcluir}
        style={{ width: "60vw" }}
        footer={footerModalExcluir}
        onHide={() => setmodalExcluir(false)}
      >
        <div>
          <p>Deseja excluir este edital? </p>
        </div>
      </Dialog>
      <Dialog
        header="Duplicar"
        visible={modalDuplicar}
        style={{ width: "60vw" }}
        footer={footerModaDuplicar}
        onHide={() => setmodalDuplicar(false)}
      >
        <div>
          <p>Deseja duplicar este edital?</p>
        </div>
      </Dialog>
      <Dialog
        header="Adicionar objeto"
        visible={modalCadastrarObjeto}
        style={{ width: "60vw" }}
        footer={footerModalCadastrarObjeto}
        onHide={() => {
          setModalCadastrarObjeto(false);
          setNovoObjeto("");
        }}
      >
        <div>
          <label htmlFor="objeto">Nome do objeto</label>
          <br />
          <InputText
            value={novoObjeto}
            onChange={e => setNovoObjeto(e.target.value.toUpperCase() || "")}
            className="w-100"
          />
        </div>
      </Dialog>
      <ModalHistoricoEdital
        historico={edital.historico ? edital.historico : {}}
        abreModalHistorico={modalHistorico}
        fechaModalHistorico={e => setModalHistorico(e)}
      />
    </Fragment>
  );
};

export default Edital;
