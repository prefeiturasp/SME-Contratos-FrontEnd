import React, { useState, useEffect } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { BuscaProdutosForm } from "../../components/Contratos/BuscaProdutosForm";
import ListaProdutos from "../../components/Contratos/ListaProdutos";
import { getListaDeProdutos } from "../../service/Produtos.service";
import { LISTAR_PRODUTOS } from "../../configs/urls.constants";

export default () => {
  const filtrosIniciais = {
    nome: "",
    categoria: "",
    durabilidade: "",
    grupo_alimentar: "",
    armazenabilidade: "",
  };
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [produtos, setProdutos] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const ajustarFiltros = filtros => {
    let filtrosAjustados = { ...filtros };
    filtrosAjustados.nome = filtros.nome && filtros.nome;
    filtrosAjustados.situacao = filtros.situacao && filtros.situacao.id;
    filtrosAjustados.armazenabilidade =
      filtros.armazenabilidade && filtros.armazenabilidade.id;
    filtrosAjustados.grupo_alimentar = filtros.grupo_alimentar
      ? filtros.grupo_alimentar.id
      : "";
    filtrosAjustados.durabilidade = filtros.durabilidade
      ? filtros.durabilidade.id
      : "";
    filtrosAjustados.categoria = filtros.categoria ? filtros.categoria.id : "";

    return filtrosAjustados;
  };

  const onBuscarClick = filtros => {
    let filtrosAjustados = ajustarFiltros(filtros);
    setFiltros(filtrosAjustados);
  };

  const onLimparClick = () => {
    setProdutos([]);
    setTotalProdutos([]);
    setLoading(false);
  };

  const mudarPagina = pagina => {
    setFiltros({ ...filtros, page: pagina });
  };

  useEffect(() => {
    const buscaAtas = async () => {
      setLoading(true);
      const data = await getListaDeProdutos(filtros);
      setProdutos(data.results);
      setTotalProdutos(data.count);
      setLoading(false);
    };

    buscaAtas();
  }, [filtros]);

  return (
    <Page
      breadcrumb={[
        { label: "Cadastros" },
        { label: "Produtos", url: "#" + LISTAR_PRODUTOS },
      ]}
    >
      <h4>Cadastro de Produtos</h4>
      <Container>
        <BuscaProdutosForm
          onBuscarClick={filtros => onBuscarClick(filtros)}
          onLimparClick={onLimparClick}
        />
        <hr />
        <ListaProdutos
          loading={loading}
          produtos={produtos}
          mudarPagina={mudarPagina}
          totalProdutos={totalProdutos}
        />
      </Container>
    </Page>
  );
};
