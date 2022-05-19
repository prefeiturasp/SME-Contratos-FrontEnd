import React, { useState, useEffect, Fragment, useCallback } from "react";
import $ from "jquery";
import moment from "moment";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { getEdital } from "../../service/Editais.service";
import Edital from "./Edital";
import { getUrlParams } from "../../utils/params";
import { Alert } from "reactstrap";
import { hasFlashMessage, getFlashMessage } from "../../utils/flashMessages";
import { EDITAL, LISTAR_EDITAIS } from "../../configs/urls.constants";

const EditalContainer = () => {
  const { uuid } = getUrlParams();

  const [edital, setEdital] = useState({});
  const [alerta, setAlerta] = useState(false);
  const [alertaDuplicar, setAlertaDuplicar] = useState(true);

  useEffect(() => {
    if (uuid) {
      (async () => {
        const dados = await getEdital(uuid);
        dados.data_homologacao = moment(
          dados.data_homologacao,
          "YYYY-MM-DD",
        ).toDate();
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

  const mostraAlerta = useCallback(() => {
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
    }, 5000);
  }, []);

  const fechaAlerta = () => setAlerta(false);

  return (
    <Fragment>
      <Page
        breadcrumb={[
          { label: "Contratos" },
          { label: "Editais", url: "#" + LISTAR_EDITAIS },
          { label: "Novo Edital", url: "#" + EDITAL },
        ]}
      >
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
        <h3>
          {uuid
            ? "Edital Nº " + edital.numero
            : "Cadastro de Edital e Obrigações"}
        </h3>
        <Container>
          {edital && <Edital edital={edital} mostraAlerta={mostraAlerta} />}
        </Container>
      </Page>
    </Fragment>
  );
};

export default EditalContainer;
