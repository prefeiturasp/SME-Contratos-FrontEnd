import React, { Component } from "react";
import moment from "moment";
import { Formik, Form } from "formik";
import StepZilla from "react-stepzilla";
import { Dialog } from "primereact/dialog";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import Informacoes from "./informacoes";
import { contratoValidations } from "./validations";
import Gestao from "./Gestao";
import AnexosContrato from "./AnexosContrato";
import Finalizar from "./Finalizar";
import { getUrlParams } from "../../utils/params";
import {
  getContratoByUUID,
  updateContrato
} from "../../service/Contratos.service";
import { redirect } from "../../utils/redirect";
import { getCargosCoad } from "../../service/Cargos.service";

export default class CadastrarContrato extends Component {
  state = {
    uuid_contrato: null,
    termo_contrato: null,
    gestor: null,
    visible: false,
    visibleCancelar: false,
    coordenador: null
  };

  async componentDidMount() {
    const param = getUrlParams();
    const contrato = await getContratoByUUID(param.uuid);
    const cargo = await getCargosCoad();

    if (!param.uuid) {
      this.setState({ visible: true });
    }

    const { coordenador } = cargo;

    const { termo_contrato, gestor, uuid } = contrato;
    this.setState({
      termo_contrato,
      gestor: gestor.uuid,
      uuid_contrato: uuid,
      coordenador: coordenador.uuid
    });
  }

  cancelarCadastro = () => {
    console.log("CANCELAR CONTRATO");
    this.setState({ visibleCancelar: true });
  };

  esconderCancelar = () => {
    this.setState({visibleCancelar: false})
  }

  handleSubmit = async values => {
    const { uuid_contrato } = this.state;
    values["data_assinatura"] = moment(values.data_assinatura).format(
      "YYYY-MM-DD"
    );
    values["data_ordem_inicio"] = moment(values.data_ordem_inicio).format(
      "YYYY-MM-DD"
    );
    values["dotacao_orcamentaria"] = [values.dotacao_orcamentaria];

    const cadastro = await updateContrato(values, uuid_contrato);
    if(cadastro.criado_em){
      // contratos-continuos
      // Contrato cadastrado com sucesso
      redirect('/#/contratos-continuos?cadastro=ok')
    }
  };

  handleVisible = () => {
    redirect("/");
  };

  render() {
    const { termo_contrato, gestor, visible, coordenador } = this.state;
    const steps = [
      {
        name: "Informações Contrato/Empresa",
        component: <Informacoes cancelar={this.cancelarCadastro} />
      },
      {
        name: "Informações Gestão/Unidade",
        component: (
          <Gestao termo={termo_contrato} cancelar={this.cancelarCadastro} />
        )
      },
      {
        name: "Informações Anexos/Observações",
        component: <AnexosContrato cancelar={this.cancelarCadastro} />
      },
      { name: "Contrato cadastrado", component: <Finalizar /> }
    ];
    return (
      <Page>
        <Dialog
          header="Cancelar cadastro de contrato"
          visible={this.state.visibleCancelar}
          style={{ width: "50vw", "z-index": 1000 }}
          modal={true}
          onHide={this.esconderCancelar}
          footer={
            <div className="pb-3">
              <button
                className="btn btn-coad-background-outline"
              >
                Cancelar cadastro
              </button>
              <button onClick={() => this.esconderCancelar()} type="button" className="btn btn-coad-primary">
                Voltar
              </button>
            </div>
          }
        >
          Deseja cancelar cadastro de contato? Se prosseguir, todos os dados serão perdidos.
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
                tipo_servico: "",
                processo: "",
                estado_contrato: "VIGENTE",
                situacao: "RASCUNHO",
                data_assinatura: new Date(),
                data_ordem_inicio: new Date(),
                vigencia_em_dias: "",
                gestor: gestor,
                coordenador: coordenador,
                nucleo_responsavel: "",
                observacoes: "",
                objeto: "",
                empresa_contratada: ""
              }}
              validationSchema={contratoValidations}
              onSubmit={(values, { setSubmitting }) => {
                this.handleSubmit(values);
                setSubmitting(false);
              }}
            >
              <Form>
                <div className="step-progress">
                  <StepZilla
                    steps={steps}
                    // nextButtonCls={"btn btn-coad-primary"}
                    // backButtonCls={"btn btn-coad-background-outline"}
                    // nextButtonText={"Avançar"}
                    // backButtonText={"Voltar"}
                    stepsNavigation={false}
                    showNavigation={false}
                    // prevBtnOnLastStep={true}
                    // onStepChange={step => console.log(step)}
                    // nextTextOnFinalActionStep={"Cadastrar"}
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
