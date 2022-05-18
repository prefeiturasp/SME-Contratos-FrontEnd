import React, { useEffect, useState, useRef } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import ListaEditais from "../../components/Contratos/ListaEditais";
import { Messages } from "primereact/messages";
import { BuscaEditaisForm } from "../../components/Contratos/BuscaEditaisForm";
import { getListaDeEditais } from "../../service/Editais.service";

function ListarEditaisPage() {
  const filtrosIniciais = {
    empresa_contratada: "",
    encerramento_de: "",
    encerramento_ate: "",
    equipamento: "",
    estado_contrato: "",
    situacao: "",
    termo_Contrato: "",
    tipo_servico: "",
  };

  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [editais, setEditais] = useState([]);
  const [totalEditais, setTotalEditais] = useState([]);
  const [loading, setLoading] = useState(true);
  const messages = useRef(null);

  const ajustarFiltros = filtros => {
    let filtrosAjustados = { ...filtros };
    filtrosAjustados.status = filtros.status ? filtros.status.id : "";
    filtrosAjustados.objeto = filtros.objeto ? filtros.objeto.id : "";
    filtrosAjustados.tipo_contratacao = filtros.tipo_contratacao
      ? filtros.tipo_contratacao.id
      : "";
    filtrosAjustados.data_inicial =
      filtros.data_inicial && filtros.data_inicial.toISOString
        ? filtros.data_inicial.toISOString().slice(0, 10)
        : "";
    filtrosAjustados.data_final =
      filtros.data_final && filtros.data_final.toISOString
        ? filtros.data_final.toISOString().slice(0, 10)
        : "";
    return filtrosAjustados;
  };

  const onBuscarClick = filtros => {
    let filtrosAjustados = ajustarFiltros(filtros);
    setFiltros(filtrosAjustados);
  };

  const mudarPagina = pagina => {
    setFiltros({ ...filtros, page: pagina });
  };

  useEffect(() => {
    const buscaEditais = async () => {
      setLoading(true);
      const data = await getListaDeEditais(filtros);
      setEditais(data.results);
      setTotalEditais(data.count);
      setLoading(false);
    };

    buscaEditais();
  }, [filtros]);

  return (
    <Page>
      <Messages ref={messages}></Messages>
      <h4>Editais</h4>
      <Container icone="pi pi-filter-fill" subtitulo="Filtrar Editais">
        <BuscaEditaisForm onBuscarClick={filtros => onBuscarClick(filtros)} />
        <hr />
        <ListaEditais
          loading={loading}
          editais={editais}
          mudarPagina={mudarPagina}
          totalEditais={totalEditais}
        />
      </Container>
    </Page>
  );
}

export default ListarEditaisPage;
