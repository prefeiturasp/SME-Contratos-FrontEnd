import React, { Component } from "react";
import $ from "jquery";
import moment from "moment";
import { Formik, Form } from "formik";
import StepZilla from "react-stepzilla";
import "react-stepzilla/src/css/main.css";
import { Dialog } from "primereact/dialog";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import Informacoes from "./informacoes";
import Gestao from "./Gestao";
import AnexosContrato from "./AnexosContrato";
import Finalizar from "./Finalizar";
import { getUrlParams } from "../../utils/params";
import {
  getContratoByUUID,
  updateContrato,
  CancelarContrato,
} from "../../service/Contratos.service";
import { redirect } from "../../utils/redirect";
import { getCargosCoad } from "../../service/Cargos.service";
import { Messages } from "primereact/messages";
import ListarObrigacoesContratuais from "./ObrigacoesContratuais";
import { OK } from "http-status-codes";
import { setFlashMessage } from "../../utils/flashMessages";
// import { contratoValidations } from "./validations";

export default class CadastrarContrato extends Component {
  state = {
    uuid_contrato: null,
    termo_contrato: null,
    gestor: null,
    visible: false,
    visibleCancelar: false,
    coordenador: null,
    alertaCancelamento: false,
    cancelamento: false,
    situacaoContrato: "RASCUNHO",
    contrato: null,
    dotacao: [],
    unidades_selecionadas: [],
    valor_total: 0
  };

  async componentDidMount() {
    const param = getUrlParams();
    const contrato = await getContratoByUUID(param.uuid);
    const cargo = await getCargosCoad();

    this.setState({
      contrato: contrato,
      dotacao: contrato.dotacao_orcamentaria,
    });

    if (contrato.situacao !== "RASCUNHO") {
      this.setState({
        cancelamento: true,
        situacaoContrato: contrato.situacao,
      });
    }

    if (!param.uuid) {
      this.setState({ visible: true });
    }

    const { coordenador } = cargo;

    const { termo_contrato, gestor, uuid } = contrato;
    this.setState({
      termo_contrato,
      gestor: gestor ? gestor.uuid : null,
      uuid_contrato: uuid,
      coordenador: coordenador ? coordenador.uuid : null,
    });
    $("#cancelar-contrato").click(function () {
      $(".form-cadastrar-contrato").get(0).reset();
    });
  }

  setUnidadesSelecionadas = (unidades_selecionadas) => {
    this.setState({ unidades_selecionadas });
  };

  cancelarCadastro = async () => {
    const { uuid_contrato } = this.state;
    const resultado = await CancelarContrato(uuid_contrato);
    if (resultado.status === OK) {
      this.setState({ visibleCancelar: false });
      window.scrollTo(0, 0);
      this.messages.show({
        severity: "warn",
        life: 10000,
        detail: "Cadastro de contrato cancelado",
      });
    }
  };

  esconderCancelar = () => {
    this.setState({ visibleCancelar: false });
  };

  removeEmpty = (lista) => {
    const novaLista = lista.filter((valor, i) => {
      if (valor !== null || valor !== undefined || valor !== "empty") {
        return valor;
      } else {
        delete lista[i];
        return null;
      }
    });
    return novaLista;
  };

  handleSubmit = async (values) => {
    const { uuid_contrato, dotacao, unidades_selecionadas } = this.state;
    values.unidades_selecionadas = unidades_selecionadas;
    values["data_assinatura"] = moment(values.data_assinatura).format(
      "YYYY-MM-DD"
    );
    values["data_ordem_inicio"] = moment(values.data_ordem_inicio).format(
      "YYYY-MM-DD"
    );
    values["data_encerramento"] = moment(values.data_encerramento).format(
      "YYYY-MM-DD"
    );
    values["dotacao_orcamentaria"] = this.removeEmpty(dotacao);

    const resultado = await updateContrato({ ...values,
      dotacoes_orcamentarias: this.state.dotacao,
      valor_total: this.state.valor_total
    }, uuid_contrato);

    if (resultado.status === OK) {
      setFlashMessage("Contrato cadastrado com sucesso", "sucesso");
      redirect("/#/contratos-continuos");
    }
  };

  handleVisible = () => {
    redirect("/");
  };

  mostrarModalCancelar = () => {
    this.setState({ visibleCancelar: true });
  };

  setDotacoesOrcamentarias = ({ dotacoes, valorTotal}) => {
    this.setState({ dotacao: dotacoes, valor_total: valorTotal });
  };

  render() {
    const {
      termo_contrato,
      gestor,
      visible,
      coordenador,
      cancelamento,
      contrato,
      dotacao,
      valor_total
    } = this.state;
    const steps = [
      {
        name: "Contrato/Empresa",
        component: (
          <Informacoes
            cancelar={this.mostrarModalCancelar}
            cancelamento={cancelamento}
            dotacao={dotacao}
            valorTotalSalvo={valor_total}
            setDotacoesOrcamentarias={this.setDotacoesOrcamentarias}
            contrato={contrato}
          />
        ),
      },
      {
        name: "Obrigações Contratuais",
        component: (
          <ListarObrigacoesContratuais
            cancelamento={cancelamento}
            cancelar={this.mostrarModalCancelar}
          />
        ),
      },
      {
        name: "Gestão/Unidade",
        component: (
          <Gestao
            termo={termo_contrato}
            cancelar={this.mostrarModalCancelar}
            cancelamento={cancelamento}
            contrato={contrato}
            setUnidadesSelecionadas={this.setUnidadesSelecionadas}
            messages={this.messages}
          />
        ),
      },
      {
        name: "Anexos/Observações",
        component: (
          <AnexosContrato
            cancelar={this.mostrarModalCancelar}
            cancelamento={cancelamento}
          />
        ),
      },
      { name: "Contrato cadastrado", component: <Finalizar /> },
    ];
    return (
      <Page>
        <Messages ref={(el) => (this.messages = el)}></Messages>
        <Dialog
          header="Cancelar cadastro de contrato"
          visible={this.state.visibleCancelar}
          style={{ width: "50vw", zIndex: 1000 }}
          modal={true}
          onHide={this.esconderCancelar}
          footer={
            <div className="pb-3">
              <button
                onClick={this.cancelarCadastro}
                className="btn btn-coad-background-outline"
                id="cancelar-contrato"
              >
                Sim
              </button>
              <button
                onClick={() => this.esconderCancelar()}
                type="button"
                className="btn btn-coad-primary"
              >
                Não
              </button>
            </div>
          }
        >
          Deseja cancelar cadastro de contato? Se prosseguir, todos os dados
          serão perdidos.
        </Dialog>

        <Dialog
          header="Aplicar alterações"
          visible={visible}
          style={{ width: "50vw" }}
          modal={true}
          onHide={this.handleVisible}
          footer={
            <div>
              <button
                className="btn btn-coad-primary"
                onClick={this.handleVisible}
              >
                OK
              </button>
            </div>
          }
        >
          Não foi indentificado nenhum termo de contrato, você será
          redirecionado para tela principal!
        </Dialog>

        <h4>Cadastro Único de Contratos</h4>
        <Container>
          {termo_contrato ? (
            <Formik
              initialValues={{
                termo_contrato: termo_contrato,
                tipo_servico: contrato.tipo_servico
                  ? contrato.tipo_servico.uuid
                  : "",
                processo: contrato.processo ? contrato.processo : "",
                estado_contrato: contrato.estado_contrato
                  ? contrato.estado_contrato
                  : "VIGENTE",
                situacao: this.state.situacaoContrato,
                data_encerramento: contrato.data_encerramento
                  ? new Date(
                      moment(contrato.data_encerramento).format("YYYY-MM-DD")
                    )
                  : new Date(),
                data_assinatura: contrato.data_assinatura
                  ? new Date(
                      moment(contrato.data_assinatura).format("YYYY-MM-DD")
                    )
                  : new Date(),
                data_ordem_inicio: contrato.data_ordem_inicio
                  ? new Date(
                      moment(contrato.data_ordem_inicio).format("YYYY-MM-DD")
                    )
                  : new Date(),
                vigencia_em_dias: contrato.vigencia_em_dias
                  ? contrato.vigencia_em_dias
                  : "",
                gestor: gestor,
                dotacao_orcamentaria: contrato.dotacao_orcamentaria
                  ? contrato.dotacao_orcamentaria
                  : [],
                coordenador: coordenador,
                nucleo_responsavel: contrato.nucleo_responsavel
                  ? contrato.nucleo_responsavel.uuid
                  : "",
                observacoes: contrato.observacoes ? contrato.observacoes : "",
                objeto: contrato.objeto ? contrato.objeto : "",
                empresa_contratada: contrato.empresa_contratada
                  ? contrato.empresa_contratada.uuid
                  : "",
              }}
              // validationSchema={contratoValidations}
              onReset={this.mostrarModalCancelar}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.handleSubmit(values);
              }}
            >
              <Form className="form-cadastrar-contrato">
                <div className="step-progress">
                  <StepZilla
                    steps={steps}
                    stepsNavigation={false}
                    showNavigation={false}
                    preventEnterSubmission={true}
                  />
                </div>
              </Form>
            </Formik>
          ) : (
            "Termo de Contrato não encontrado"
          )}
        </Container>
      </Page>
    );
  }
}
