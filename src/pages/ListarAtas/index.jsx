import React, { useState, useEffect } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import ListaAtas from "../../components/Contratos/ListaAtas";
import { BuscaAtasForm } from "../../components/Contratos/BuscaAtasForm";
import { getListaDeAtas } from "../../service/Atas.service";
import { LISTAR_ATAS } from "../../configs/urls.constants";

export default () => {
  const filtrosIniciais = {
    numero: "",
    objeto: "",
    empresa: "",
    cnpj_empresa: "",
    status: "",
    data_inicial: "",
    data_final: "",
  };

  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [atas, setAtas] = useState([]);
  const [totalAtas, setTotalAtas] = useState([]);
  const [loading, setLoading] = useState(true);

  const ajustarFiltros = filtros => {
    let filtrosAjustados = { ...filtros };
    filtrosAjustados.cnpj_empresa = filtros.cnpj_empresa
      ? filtros.cnpj_empresa.replace(/\D+/g, "")
      : "";
    filtrosAjustados.empresa = filtros.empresa ? filtros.empresa.uuid : "";
    filtrosAjustados.status = filtros.status ? filtros.status.id : "";
    filtrosAjustados.objeto = filtros.objeto ? filtros.objeto.id : "";
    filtrosAjustados.data_inicial = filtros.data_inicial
      ? filtros.data_inicial.value.toISOString().slice(0, 10)
      : "";
    filtrosAjustados.data_final = filtros.data_final
      ? filtros.data_final.value.toISOString().slice(0, 10)
      : "";
    return filtrosAjustados;
  };

  const onBuscarClick = filtros => {
    let filtrosAjustados = ajustarFiltros(filtros);
    setFiltros(filtrosAjustados);
  };

  const onLimparClick = () => {
    setAtas([]);
    setTotalAtas([]);
    setLoading(false);
  };

  const mudarPagina = pagina => {
    setFiltros({ ...filtros, page: pagina });
  };

  useEffect(() => {
    const buscaAtas = async () => {
      setLoading(true);
      const data = await getListaDeAtas(filtros);
      setAtas(data.results);
      setTotalAtas(data.count);
      setLoading(false);
    };

    buscaAtas();
  }, [filtros]);

  return (
    <Page
      breadcrumb={[
        { label: "Contratos" },
        { label: "Atas", url: "#" + LISTAR_ATAS },
      ]}
    >
      <h4>Atas</h4>
      <Container>
        <BuscaAtasForm
          onBuscarClick={filtros => onBuscarClick(filtros)}
          onLimparClick={onLimparClick}
        />
        <hr />
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
