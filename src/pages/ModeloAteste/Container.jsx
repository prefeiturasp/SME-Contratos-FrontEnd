import React, { useState, useEffect, Fragment, useCallback } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { getModeloAteste } from "../../service/ModeloAteste.service";
import Modelo from "./Modelo";
import { getUrlParams } from "../../utils/params";
import { Alert } from "reactstrap";

const ModeloAteste = props => {
  const [modelo, setModelo] = useState({});
  const [alerta, setAlerta] = useState(false);

  useEffect(() => {
    const param = getUrlParams();
    if (param.uuid) {
      const modelosService = async () => {
        const modelo = await getModeloAteste(param.uuid);
        setModelo(modelo);
      };
      modelosService();
    }
  }, [setModelo]);

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
        <Alert color="success" isOpen={alerta} toggle={fechaAlerta}>
          <span className="font-weight-bold d-flex justify-content-center">
            Item de verificação adicionado com sucesso
          </span>
        </Alert>
        <h3>Criar Modelo de Ateste</h3>
        <Container>
          {modelo ? <Modelo modelo={modelo} mostraAlerta={mostraAlerta} /> : ""}
        </Container>
      </Page>
    </Fragment>
  );
};

export default ModeloAteste;
