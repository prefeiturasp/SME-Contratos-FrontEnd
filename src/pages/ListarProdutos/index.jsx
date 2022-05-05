import React, { useState, useEffect } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { BuscaProdutosForm } from "../../components/Contratos/BuscaProdutosForm";
import ListaProdutos from "../../components/Contratos/ListaProdutos";
import { getListaDeProdutos } from "../../service/Produtos.service";

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
    <Page>
      <h4>Produtos</h4>
      <Container>
        <BuscaProdutosForm />
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
