import React, { useState, useEffect } from "react";
import { FormGroup, Label, Button as ButtonBootstrap } from "reactstrap";
import moment from "moment";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Switch } from "antd";
import { CREATED, OK } from "http-status-codes";
import { redirect } from "../../utils/redirect";
import { getUrlParams } from "../../utils/params";
import { Row, Col } from "reactstrap";

import CoadAccordion from "../../components/Global/CoadAccordion";
import { SelecionaData } from "../../components/Contratos/SelecionaData";
import { SelecionaEdital } from "../../components/Contratos/SelecionaEditalContrato";

import useToast from "../../hooks/useToast";
import Container from "../../components/Global/Container";
import Page from "../../components/Global/Page";

import { alteraAta, criaAta, getAta } from "../../service/Atas.service";
import { STATUS_ATA, UNIDADES_VIGENCIA } from "./constantes";
import { AccordionEmpresaContratada } from "../../components/Contratos/AccordionEmpresaContratada";
import { ATAS, LISTAR_ATAS } from "../../configs/urls.constants";

const Ata = () => {
  const { uuid } = getUrlParams();

  const [visivel, setVisivel] = useState(false);
  const [visivelCancelar, setVisivelCancelar] = useState(false);
  const [ata, setAta] = useState({});
  const [modoVisualizacao, setModoVisualizacao] = useState(true);
  const [incluir, setIncluir] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (uuid) {
      (async () => {
        const dados = await getAta(uuid);
        dados.data_assinatura = moment(
          dados.data_assinatura,
          "YYYY-MM-DD",
        ).toDate();
        let numeroSeparado = dados.numero.split("/");
        dados.numero = numeroSeparado[0];
        dados.numero_ano = numeroSeparado[1];
        dados.unidade_vigencia = UNIDADES_VIGENCIA.find(
          e => e.id === dados.unidade_vigencia,
        );
        setAta(dados);
      })();
    }
  }, [uuid, setAta]);

  useEffect(() => {
    const parametro = getUrlParams();
    if (!parametro.uuid) {
      setIncluir(false);
      setModoVisualizacao(false);
    }
  }, [ata]);

  const calculaDataEncerramento = (data_assinatura, vigencia, unidade) => {
    if (!data_assinatura || !vigencia || !unidade) {
      setAta({ ...ata, data_encerramento: "" });
      return false;
    }
    let dataInicio = moment(data_assinatura.value);
    if (unidade === UNIDADES_VIGENCIA[0])
      return dataInicio.add("days", vigencia).format("DD/MM/yyyy");
    else
      return dataInicio
        .add("months", vigencia)
        .subtract(1, "days")
        .format("DD/MM/yyyy");
  };

  const fechaDialog = () => {
    setVisivel(false);
  };

  const exibeDialog = () => {
    setVisivel(true);
  };

  const formatarAta = () => {
    let ataFormatada = { ...ata };
    delete ataFormatada.numero_ano;
    ataFormatada.numero += "/" + ata.numero_ano;
    ataFormatada.data_assinatura = moment(ata.data_assinatura.value).format(
      "yyyy-MM-DD",
    );
    ataFormatada.data_encerramento = moment(
      ata.data_encerramento,
      "DD/MM/yyyy",
    ).format("yyyy-MM-DD");
    ataFormatada.edital = ata.edital.uuid;
    ataFormatada.empresa = ata.empresa.uuid;
    ataFormatada.status = ata.status.id;
    ataFormatada.unidade_vigencia = ata.unidade_vigencia.id;
    return ataFormatada;
  };

  const criarAta = async () => {
    let ataFormatada = formatarAta();
    const resultado = await criaAta(ataFormatada);
    if (resultado.status === CREATED) {
      toast.showSuccess("Ata criada com sucesso");
      redirect("#/listar-atas");
    }
  };

  const alterarAta = async () => {
    let editalFormatado = formatarAta();
    const resultado = await alteraAta(editalFormatado);
    if (resultado.status === OK) {
      toast.showSuccess("Ata alterada com sucesso");
      redirect("#/listar-atas");
    }
  };

  const mensagemConfirmacao = incluir
    ? "Confirma a alteração desta ata?"
    : "Confirma a criação de uma nova ata?";

  const habilitaBotao =
    !modoVisualizacao &&
    ata.numero &&
    ata.numero_ano &&
    ata.edital &&
    ata.data_encerramento &&
    ata.empresa &&
    ata.data_assinatura &&
    ata.vigencia &&
    ata.unidade_vigencia;

  return (
    <>
      <Page
        breadcrumb={[
          { label: "Contratos" },
          { label: "Atas", url: "#" + LISTAR_ATAS },
          { label: "Nova Ata", url: "#" + ATAS },
        ]}
      >
        <h3>{uuid ? "Ata Nº " + ata.numero : "Cadastro de Atas"}</h3>
        <Container>
          <FormGroup className="d-flex flex-row-reverse mt-3">
            <Button
              disabled={!habilitaBotao}
              className="btn-coad-primary"
              label="Salvar"
              onClick={exibeDialog}
            />
            <Button
              disabled={!habilitaBotao}
              className="btn-coad-background-outline mr-2"
              label="Cancelar"
              onClick={() => setVisivelCancelar(true)}
            />
            <ButtonBootstrap
              onClick={() => redirect("#/listar-atas")}
              className="btn-coad-blue mx-2"
            >
              <i className="fas fa-arrow-left" /> Voltar
            </ButtonBootstrap>
          </FormGroup>
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
                    redirect("/#/listar-atas");
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
            <span>Deseja cancelar alterações dessa ata?</span>
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
                  onClick={criarAta}
                />
              ) : (
                <Button
                  className="btn-coad-primary"
                  label="Sim"
                  onClick={alterarAta}
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
                  onChange={() => setModoVisualizacao(!modoVisualizacao)}
                />
              </Col>
            ) : (
              ""
            )}
          </Row>
          <br />
          <CoadAccordion aberto={false} titulo="Informações Gerais">
            <div className="p-grid">
              <div className="p-col-6">
                <Label className="font-weight-bold w-100">Número da Ata</Label>
                <InputNumber
                  className="w-50 pr-2"
                  value={ata.numero}
                  format={false}
                  onChange={e => setAta({ ...ata, numero: e.value })}
                  disabled={modoVisualizacao}
                  placeholder="Número"
                />

                <InputMask
                  className="w-50 pl-2"
                  mask="9999"
                  value={ata.numero_ano || ""}
                  onChange={e => setAta({ ...ata, numero_ano: e.target.value })}
                  autoClear={false}
                  disabled={modoVisualizacao}
                  placeholder="Ano"
                />
              </div>

              <div className="p-col-6">
                <Label className="font-weight-bold">Status</Label>
                <Dropdown
                  className="w-100"
                  optionLabel="nome"
                  options={STATUS_ATA}
                  value={ata.status}
                  onChange={e => setAta({ ...ata, status: e.target.value })}
                  placeholder="Selecione o Status"
                  disabled={modoVisualizacao}
                />
              </div>

              <div className="p-col-6">
                <Label className="font-weight-bold">Número do Edital</Label>
                <SelecionaEdital
                  className="w-100"
                  editalSalvo={ata.edital}
                  onSelect={e => setAta({ ...ata, edital: e })}
                  disabled={modoVisualizacao}
                  filter
                />
              </div>

              <div className="p-col-6">
                <Label className="font-weight-bold">Número do Processo</Label>
                <InputMask
                  className="w-100"
                  mask="9999.9999/9999999-9"
                  value={ata.edital ? ata.edital.processo : ""}
                  autoClear={false}
                  disabled={true}
                  placeholder="Ex.: XXXX.XXXX/XXXXXXX-X"
                />
              </div>

              <div className="p-col-4">
                <Label className="font-weight-bold">Data de Assinatura</Label>
                <SelecionaData
                  className="w-100"
                  placeholder={"Data de Assinatura"}
                  data={ata.data_assinatura}
                  onSelect={data => {
                    let dataEncerramento = calculaDataEncerramento(
                      data,
                      ata.vigencia,
                      ata.unidade_vigencia,
                    );
                    setAta({
                      ...ata,
                      data_assinatura: data,
                      data_encerramento: dataEncerramento,
                    });
                  }}
                  disabled={modoVisualizacao}
                />
              </div>
              <div className="p-col-4">
                <Label className="font-weight-bold w-100">Vigência</Label>
                <InputNumber
                  className="w-50 pr-2"
                  value={ata.vigencia}
                  format={false}
                  onChange={e => {
                    let dataEncerramento = calculaDataEncerramento(
                      ata.data_assinatura,
                      e.value,
                      ata.unidade_vigencia,
                    );
                    setAta({
                      ...ata,
                      vigencia: e.value,
                      data_encerramento: dataEncerramento,
                    });
                  }}
                  disabled={modoVisualizacao}
                  placeholder="Duração"
                />
                <Dropdown
                  className="w-50 pl-2"
                  optionLabel="nome"
                  options={UNIDADES_VIGENCIA}
                  value={ata.unidade_vigencia}
                  onChange={e => {
                    let dataEncerramento = calculaDataEncerramento(
                      ata.data_assinatura,
                      ata.vigencia,
                      e.target.value,
                    );
                    setAta({
                      ...ata,
                      unidade_vigencia: e.target.value,
                      data_encerramento: dataEncerramento,
                    });
                  }}
                  placeholder="Selecione a duração"
                  disabled={modoVisualizacao}
                />
              </div>
              <div className="p-col-4">
                <Label className="font-weight-bold">Data de Encerramento</Label>
                <InputText
                  className="w-100"
                  value={ata.data_encerramento || ""}
                  disabled={true}
                />
              </div>
            </div>
          </CoadAccordion>
          <AccordionEmpresaContratada
            empresaContratada={ata.empresa ? ata.empresa : {}}
            atualizaEmpresa={e => setAta({ ...ata, empresa: e })}
            disabilitado={modoVisualizacao}
            aberto={false}
          />
          <FormGroup className="d-flex flex-row-reverse mt-3">
            <Button
              disabled={!habilitaBotao}
              className="btn-coad-primary mr-1"
              label="Salvar"
              onClick={exibeDialog}
            />
            <Button
              disabled={!habilitaBotao}
              className="btn-coad-background-outline mr-2"
              label="Cancelar"
              onClick={() => setVisivelCancelar(true)}
            />
            <ButtonBootstrap
              onClick={() => redirect("#/listar-atas")}
              className="btn-coad-blue mx-2"
            >
              <i className="fas fa-arrow-left" /> Voltar
            </ButtonBootstrap>
          </FormGroup>
        </Container>
      </Page>
    </>
  );
};

export default Ata;
