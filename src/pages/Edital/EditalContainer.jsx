import React, { useState, useEffect, Fragment, useCallback } from "react";
import $ from "jquery";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { getEdital } from "../../service/Editais.service";
import Edital from "./Edital";
import { getUrlParams } from "../../utils/params";
import { Alert } from "reactstrap";
import { hasFlashMessage, getFlashMessage } from "../../utils/flashMessages";

const EditalContainer = props => {
  const { uuid } = getUrlParams();

  const [edital, setEdital] = useState({});
  const [alerta, setAlerta] = useState(false);
  const [alertaDuplicar, setAlertaDuplicar] = useState(true);

  useEffect(() => {
    if (uuid) {
      (async () => {
        const dados = await getEdital(uuid);
        setEdital(dados);
      })();
    }
  }, [uuid, setEdital]);

  useEffect(() => {
    if ($("#alerta-duplicidade").length) {
      setTimeout(() => {
        setAlertaDuplicar(false);
      }, 5000);
    }
  });

  const mostraAlerta = useCallback(event => {
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
    }, 5000);
  }, []);

  const fechaAlerta = () => setAlerta(false);

  return (
    <Fragment>
      <Page>
        {hasFlashMessage("sucesso") ? (
          <Alert
            color="success"
            isOpen={alertaDuplicar}
            toggle={() => setAlertaDuplicar(false)}
            id="alerta-duplicidade"
          >
            <span className="font-weight-bold d-flex justify-content-center">
              {getFlashMessage("sucesso")}
            </span>
          </Alert>
        ) : (
          ""
        )}

        <Alert color="success" isOpen={alerta} toggle={fechaAlerta}>
          <span className="font-weight-bold d-flex justify-content-center">
            Item adicionado com sucesso
          </span>
        </Alert>
        <h3>{`${uuid ? "Visualizar" : "Cadastro de"} Edital e Obrigações`}</h3>
        <Container>
          {edital && <Edital edital={edital} mostraAlerta={mostraAlerta} />}
        </Container>
      </Page>
    </Fragment>
  );
};

export default EditalContainer;
