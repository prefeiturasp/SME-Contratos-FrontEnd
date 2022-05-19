import React, { useState, useEffect } from "react";

import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { getListaDeEmpresas } from "../../service/Empresas.service";
import ListaEmpresas from "../../components/Contratos/ListaEmpresas";
import { BuscaEmpresasForm } from "../../components/Contratos/BuscaEmpresasForm";
import { LISTAR_EMPRESAS } from "../../configs/urls.constants";

export default () => {
  const filtrosIniciais = {
    empresa: "",
    cnpj_empresa: "",
    tipo_servico: "",
    tipo_fornecedor: "",
    situacao: "",
  };

  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [empresas, setEmpresas] = useState([]);
  const [totalEmpresas, setTotalEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  const ajustarFiltros = filtros => {
    let filtrosAjustados = { ...filtros };
    filtrosAjustados.cnpj_empresa = filtros.cnpj_empresa
      ? filtros.cnpj_empresa.replace(/\D+/g, "")
      : "";
    filtrosAjustados.nome = filtros.nome ? filtros.nome.nome : "";
    filtrosAjustados.tipo_servico = filtros.tipo_servico
      ? filtros.tipo_servico.id
      : "";
    filtrosAjustados.tipo_fornecedor = filtros.tipo_fornecedor
      ? filtros.tipo_fornecedor.id
      : "";
    filtrosAjustados.situacao = filtros.situacao ? filtros.situacao.id : "";
    return filtrosAjustados;
  };

  const onBuscarClick = filtros => {
    let filtrosAjustados = ajustarFiltros(filtros);
    setFiltros(filtrosAjustados);
  };

  const onLimparClick = () => {
    setEmpresas([]);
    setTotalEmpresas([]);
    setLoading(false);
  };

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
    <Page
      breadcrumb={[
        { label: "Cadastros" },
        { label: "Empresas", url: "#" + LISTAR_EMPRESAS },
      ]}
    >
      <h4>Cadastro de Empresas</h4>
      <Container>
        <BuscaEmpresasForm
          onBuscarClick={filtros => onBuscarClick(filtros)}
          onLimparClick={onLimparClick}
        />
        <hr />
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
