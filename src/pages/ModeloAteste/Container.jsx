import React, { useState, useEffect, Fragment } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { getModeloAteste } from "../../service/ModeloAteste.service";
import Modelo from "./Modelo";
import { getUrlParams } from "../../utils/params";

const ModeloAteste = props => {
  const [modelo, setModelo] = useState({});

  useEffect(() => {
    const param = getUrlParams();
    const modelosService = async () => {
      const modelo = await getModeloAteste(param.uuid);
      setModelo(modelo);
    };
    modelosService();
  }, [setModelo]);

  const alterModelo = values => {
    console.log(values);
  };

  return (
    <Fragment>
      <Page titulo="Criar Modelo de Ateste">
        <Container>
          {modelo ? <Modelo modelo={modelo} onUpdate={alterModelo} /> : ""}
        </Container>
      </Page>
    </Fragment>
  );
};

export default ModeloAteste;
