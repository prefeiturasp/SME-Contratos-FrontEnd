import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Row, Col } from "reactstrap";

import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { getListaDeEmpresas } from "../../service/Empresas.service";
import ListaEmpresas from "../../components/Contratos/ListaEmpresas";
import { redirect } from "../../utils/redirect";

export default () => {
  const filtrosIniciais = {
    empresa: "",
    cnpj_empresa: "",
    status: "",
    tipo_servico: "",
  };

  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [empresas, setEmpresas] = useState([]);
  const [totalEmpresas, setTotalEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  const mudarPagina = pagina => {
    setFiltros({ ...filtros, page: pagina });
  };

  useEffect(() => {
    const buscaEmpresas = async () => {
      setLoading(true);
      const data = await getListaDeEmpresas(filtros);
      setEmpresas(data.results);
      setTotalEmpresas(data.count);
      setLoading(false);
    };

    buscaEmpresas();
  }, [filtros]);

  return (
    <Page>
      <h4>Cadastro de Empresas</h4>
      <Container>
        <Row>
          <Col lg={12} xl={12}>
            <span className="float-right">
              <Button
                icon="pi pi-file"
                label="Criar Empresa"
                style={{ marginBottom: ".80em" }}
                className="btn-coad-background-outline"
                onClick={() => {
                  redirect(`#/empresas/`);
                }}
              />
            </span>
          </Col>
        </Row>
        <ListaEmpresas
          loading={loading}
          empresas={empresas}
          mudarPagina={mudarPagina}
          totalEmpresas={totalEmpresas}
        />
      </Container>
    </Page>
  );
};
