import React, { useState, useEffect } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import ListaAtas from "../../components/Contratos/ListaAtas";
import { Col, Row } from "reactstrap";
import { Button } from "primereact/button";
import { redirect } from "../../utils/redirect";
import { getListaDeAtas } from "../../service/Atas.service";

export default () => {
  const filtrosIniciais = {};
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [atas, setAtas] = useState([]);
  const [totalAtas, setTotalAtas] = useState([]);
  const [loading, setLoading] = useState(true);

  const mudarPagina = pagina => {
    setFiltros({ ...filtros, page: pagina });
  };

  useEffect(() => {
    const buscaEditais = async () => {
      setLoading(true);
      const data = await getListaDeAtas(filtros);
      setAtas(data.results);
      setTotalAtas(data.count);
      setLoading(false);
    };

    buscaEditais();
  }, [filtros]);

  return (
    <Page>
      <h4>Atas</h4>
      <Container>
        <Row>
          <Col lg={12} xl={12}>
            <span className="float-right">
              <Button
                icon="pi pi-file"
                label="Nova Ata"
                style={{ marginBottom: ".80em" }}
                className="btn-coad-background-outline"
                onClick={() => {
                  redirect(`#/atas/`);
                }}
              />
            </span>
          </Col>
        </Row>
        <ListaAtas
          loading={loading}
          atas={atas}
          mudarPagina={mudarPagina}
          totalAtas={totalAtas}
        />
      </Container>
    </Page>
  );
};
