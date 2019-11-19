import React from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import StepZilla from "react-stepzilla";
import Teste1 from "./Teste1";
import Teste2 from "./Teste2";
import Teste3 from "./Teste3";
import "react-stepzilla/src/css/main.css";

export default props => {
  const steps = [
    { name: "Cadastrar Nome", component: <Teste1 /> },
    { name: "Cadastrar Sobrenome", component: <Teste2 /> },
    { name: "Finalizar", component: <Teste3 /> }
  ];
  return (
    <Page titulo="Teste">
      <Container subtitulo="Página de Teste" icone="pi pi-chart-bar">
        <Formik
          initialValues={{ firstName: "", lastName: "" }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .min(15, "Deve ter mais de 15 caracteres")
              .required("Nome deve ser preenchido"),
            lastName: Yup.string()
              .min(15, "Last Name deve conter mais de 15 caracteres")
              .required("Sobrenome deve ser preenchido")
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <div className="step-progress">
              <StepZilla
                steps={steps}
                nextButtonCls={"btn btn-coad-primary"}
                backButtonCls={"btn btn-coad-background-outline"}
                nextButtonText={"Avançar"}
                backButtonText={"Voltar"}
                onStepChange={(step) => console.log(step)}
                stepsNavigation={false}
                prevBtnOnLastStep={false}
              />
            </div>
          </Form>
        </Formik>
      </Container>
    </Page>
  );
};
