import React, { useEffect, useState } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { Card } from "primereact/card";
import { Col, Row } from "reactstrap";
import { Button } from "primereact/button";
import { redirect } from "../../utils/redirect";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { getListaDotacoes } from "../../service/DotacaoOrcamentaria.service";
import { ORCAMENTO } from "../../configs/urls.constants";

export default () => {
  const [dotacoes, setDotacoes] = useState([]);
  const [totalAtas, setTotalAtas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [pagina, setPagina] = useState(0);

  const redirecionaDotacao = value => {
    const url = "#/dotacao-orcamentaria/?uuid=" + value.uuid;
    redirect(url);
  };

  const mudaPagina = event => {
    setIndex(event.first);
    setPagina(event.page + 1);
  };

  useEffect(() => {
    const buscaAtas = async () => {
      setLoading(true);
      const data = await getListaDotacoes({ page: pagina });
      setDotacoes(data.results);
      setTotalAtas(data.count);
      setLoading(false);
    };

    buscaAtas();
  }, [pagina]);

  return (
    <Page breadcrumb={[{ label: "Orçamento", url: "#" + ORCAMENTO }]}>
      <h4>Orçamento</h4>
      <Container>
        <Card className="filtro filtroBorda">
          <Row>
            <Col lg={12} xl={12}>
              <span className="float-right">
                <Button
                  icon="pi pi-file"
                  label="Adicionar dotação"
                  style={{ marginBottom: ".80em" }}
                  className="btn-coad-background-outline"
                  onClick={() => {
                    redirect(`#/dotacao-orcamentaria/`);
                  }}
                />
              </span>
            </Col>
          </Row>
        </Card>
        <div>
          <DataTable
            value={dotacoes}
            className="datatable-strapd-coad tabela-dotacoes"
            paginatorTemplate="PrevPageLink PageLinks NextPageLink"
            emptyMessage="Não existe informação para os critérios de busca utilizados"
            loading={loading}
            onRowClick={e => redirecionaDotacao(e.data)}
            selectionMode="single"
          >
            <Column field="numero_dotacao" header="Nº da Dotação" />
            <Column header="Reservado" />
            <Column header="Empenhado" />
            <Column header="Liquidado" />
            <Column header="Pago" />
          </DataTable>
          {dotacoes.length < totalAtas && (
            <Paginator
              rows={10}
              totalRecords={totalAtas}
              onPageChange={e => mudaPagina(e)}
              first={index}
            />
          )}
        </div>
      </Container>
    </Page>
  );
};
