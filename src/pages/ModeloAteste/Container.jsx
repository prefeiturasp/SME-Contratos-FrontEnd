import React, { useState, useEffect, Fragment, useCallback } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { getModeloAteste } from "../../service/ModeloAteste.service";
import Modelo from "./Modelo";
import { getUrlParams } from "../../utils/params";
import { Alert } from "reactstrap";
import { hasFlashMessage, getFlashMessage } from "../../utils/flashMessages";
import $ from "jquery";

const ModeloAteste = props => {
  const [modelo, setModelo] = useState({});
  const [alerta, setAlerta] = useState(false);
  const [alertaDuplicar, setAlertaDuplicar] = useState(true);
  const [tituloPagina, setTituloPagina] = useState("Criar Modelo de Ateste");

  useEffect(() => {
    const param = getUrlParams();
    if (param.uuid) {
      const modelosService = async () => {
        const modelo = await getModeloAteste(param.uuid);
        setModelo(modelo);
      };
      modelosService();
      setTituloPagina("Visualizar Modelo de Ateste");
    }
  }, [setModelo]);

  useEffect(() => {
    if ($("#alerta-duplicidade").length) {
      setTimeout(() => {
        setAlertaDuplicar(false);
      }, 5000);
    }
  });

  const mostraAlerta = useCallback(
    event => {
      setAlerta(true);
      setTimeout(() => {
        setAlerta(false);
      }, 5000);
    },
    [alerta]
  );

  const fechaAlerta = () => setAlerta(false);

  return (
    <Fragment>
      <Page>
        {hasFlashMessage("sucesso") ? (
          <Alert
            color="success"
            isOpen={() => setAlertaDuplicar(true)}
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
            Item de verificação adicionado com sucesso
          </span>
        </Alert>
        <h3>{tituloPagina}</h3>
        <Container>
          {modelo ? <Modelo modelo={modelo} mostraAlerta={mostraAlerta} /> : ""}
        </Container>
      </Page>
    </Fragment>
  );
};

export default ModeloAteste;
