import React from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";

export default props => {
 
  return (
    <Page titulo="Teste">
      <Container subtitulo="Página de Teste" icone="pi pi-chart-bar">
       <h1>Página de Teste</h1>
      </Container>
    </Page>
  );
};

