import React, { useEffect, useState } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import TableContrato from "../../components/Contratos/TableContrato";
import { getContratos } from "../../service/Contratos.service";
import "./style.scss";
import { BuscaContratosForm } from "../../components/Contratos/BuscaContratosForm";
import { GESTAO_CONTRATOS } from "../../configs/urls.constants";

function GestaoContratos() {
  const colunas = [
    { field: "nome_empresa", header: "Nome da empresa" },
    { field: "termo_contrato", header: "Nº do Termo de Contrato" },
    { field: "situacao", header: "Status" },
    { field: "data_encerramento", header: "Data Encerramento" },
  ];
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

  const [contratos, setContratos] = useState([]);
  const [totalContratos, setTotalContratos] = useState([]);
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [loading, setLoading] = useState(true);

  const ajustarFiltros = filtros => {
    let filtrosAjustados = { ...filtros };
    filtrosAjustados.cnpj_empresa = filtros.cnpj_empresa.replace(/\D/g, "");
    filtrosAjustados.empresa = filtros.empresa ? filtros.empresa.uuid : "";
    filtrosAjustados.status = filtros.status ? filtros.status.id : "";
    filtrosAjustados.objeto = filtros.objeto ? filtros.objeto.id : "";
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
    const setaMeusContratos = async () => {
      setLoading(true);
      await getContratos(filtros).then(data => {
        setContratos(data.results);
        setTotalContratos(data.count);
      });
      setLoading(false);
    };

    setaMeusContratos();
  }, [filtros]);

  return (
    <Page
      breadcrumb={[
        { label: "Contratos" },
        { label: "Gestão de Contratos", url: "#" + GESTAO_CONTRATOS },
      ]}
    >
      <h4>
        <strong>Gestão de Contratos</strong>
      </h4>
      <Container>
        <BuscaContratosForm onBuscarClick={filtros => onBuscarClick(filtros)} />
        <hr />
        <TableContrato
          contratos={contratos}
          totalContratos={totalContratos}
          colunas={colunas}
          loading={loading}
          mudarPagina={mudarPagina}
        />
      </Container>
    </Page>
  );
}

export default GestaoContratos;
