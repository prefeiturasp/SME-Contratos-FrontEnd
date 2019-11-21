import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import Informacoes from "./informacoes";
import { Formik, Form } from "formik";
import StepZilla from "react-stepzilla";
import { contratoValidations } from "./validations";
import Gestao from "./Gestao";

export default class CadastrarContrato extends Component {
  state = {
    termo_contrato: null,
    coordenador: null,
    gestor: null
  };

  handleSubmit = values => {
    console.log(values);
  };

  render() {
    const steps = [
      { name: "Informações Contrato/Empresa", component: <Informacoes /> },
      { name: "Informações Gestão/Unidade", component: <Gestao /> }
    ];
    const { termo_contrato } = this.state;
    return (
      <Page>
        <h4>Cadastro Único de Contratos</h4>
        <Container>
          <Formik
            initialValues={{ 
              termo_contrato: '123456',
              tipo_servico: '',
              numero_processo: '',
              estado_contrato: '',
              situacao: 'RASCUNHO',
              data_assinatura: '',
              data_ordem_inicio: '',
              vigencia_em_dias: '',
          
          }}
            // validationSchema={contratoValidations}
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
                  nextButtonText={"Avançar"}
                  backButtonText={"Voltar"}
                  stepsNavigation={false}
                  prevBtnOnLastStep={true}
                  onStepChange={step => console.log(step)}
                />
              </div>
            </Form>
          </Formik>
        </Container>
      </Page>
    );
  }
}
