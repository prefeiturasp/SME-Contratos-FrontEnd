import React from "react";
import { Button } from "reactstrap";
import ListarObrigacoesContratuais from "../../components/Contratos/ListarObrigacoesContratuais";
import Container from "../../components/Global/Container";

const ObrigacoesContratuais = props => {
  const cancelar = () => {
    props.cancelar();
    props.jumpToStep(0);
  };
  return (
    <>
      <strong>
        <i className="fas fa-lg fa-file-signature" /> Obrigações Contratuais
      </strong>
      <Container>
        <ListarObrigacoesContratuais />
        <div className="d-flex flex-row-reverse mt-4">
          <Button
            onClick={() => props.jumpToStep(2)}
            type="button"
            className="btn-coad-primary"
          >
            Avançar
          </Button>
          <Button
            type="button"
            onClick={() => cancelar()}
            className="btn-coad-background-outline mx-3"
            disabled={props.cancelamento}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => props.jumpToStep(0)}
            className="btn-coad-background-outline"
          >
            Voltar
          </Button>
        </div>
      </Container>
    </>
  );
};

export default ObrigacoesContratuais;
