import React from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { BuscaProdutosForm } from "../../components/Contratos/BuscaProdutosForm";

export default () => {
  return (
    <Page>
      <h4>Produtos</h4>
      <Container>
        <BuscaProdutosForm />
        <hr />
      </Container>
    </Page>
  );
};
