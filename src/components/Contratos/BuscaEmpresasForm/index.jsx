import React, { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputMask } from "primereact/inputmask";
import { Row, Col } from "reactstrap";
import { redirect } from "../../../utils/redirect";
import { SelecionaEmpresa } from "../SelecionaEmpresa";
import SelecionaSituacaoEmpresa from "../SelecionaSituacaoEmpresa";
import SelecionaTipoServicoEmpresa from "../SelecionaTipoServicoEmpresa";
import SelecionaTipoFornecedorEmpresa from "../SelecionaTipoFornecedorEmpresa";
import "./style.scss";

export function BuscaEmpresasForm({ onBuscarClick, onLimparClick }) {
  const [filtros, setFiltros] = useState({});

  const setaSituacao = situacao => {
    setFiltros({ ...filtros, situacao });
  };

  const setaRazaoSocial = razao_social => {
    setFiltros({ ...filtros, razao_social });
  };

  const setaNomeFantasia = nome => {
    setFiltros({ ...filtros, nome });
  };

  const setaTipoServico = tipo_servico => {
    setFiltros({ ...filtros, tipo_servico });
  };

  const setaTipoFornecedor = tipo_fornecedor => {
    setFiltros({ ...filtros, tipo_fornecedor });
  };

  const handleClickBuscar = () => {
    onBuscarClick(filtros);
  };

  const limparFiltros = () => {
    setFiltros({
      nome: "",
      razao_social: "",
      cnpj_empresa: "",
      tipo_servico: "",
      tipo_fornecedor: "",
      situacao: "",
    });
    onLimparClick();
  };

  const footer = (
    <span>
      <Button
        className="float-right"
        label="Consultar"
        onClick={handleClickBuscar}
      />
      <Button
        className="float-right btn-coad-background-outline mr-2"
        label="Limpar Filtros"
        style={{ marginRight: ".25em" }}
        onClick={limparFiltros}
      />
    </span>
  );
  return (
    <Card footer={footer} className="filtro filtroBorda">
      <Row>
        <Col lg={12} xl={12}>
          <span className="float-right">
            <Button
              icon="pi pi-file"
              label="Nova Empresa"
              style={{ marginBottom: ".80em" }}
              className="btn-coad-background-outline"
              onClick={() => {
                redirect(`#/empresas/`);
              }}
            />
          </span>
        </Col>
      </Row>
      <div className="p-grid" style={{ width: "auto" }}>
        <div className="card card-w-title filtro">
          <div className="p-grid">
            <div className="p-col-6">
              <h6>Razão Social</h6>
              <SelecionaEmpresa
                className="w-100"
                campo="razao_social"
                empresa={filtros.razao_social}
                onSelect={setaRazaoSocial}
                filter
              />
            </div>
            <div className="p-col-6 alimento-campo">
              <h6>Nome Fantasia</h6>
              <SelecionaEmpresa
                className="w-100"
                campo="nome"
                empresa={filtros.nome}
                onSelect={setaNomeFantasia}
                filter
              />
            </div>
            <div className="p-col-6 ">
              <h6>CNPJ</h6>
              <InputMask
                className="w-100"
                mask="99.999.999/9999-99"
                value={filtros.cnpj_empresa}
                onChange={e =>
                  setFiltros({ ...filtros, cnpj_empresa: e.target.value })
                }
                autoClear={false}
                placeholder="Ex: XX.XXX.XXX/XXXX-XX"
              />
            </div>
            <div className="p-col-6 pr-0">
              <h6>Tipo de Serviço</h6>
              <SelecionaTipoServicoEmpresa
                className="w-100"
                tipoServico={filtros.tipo_servico}
                onSelect={setaTipoServico}
              />
            </div>
            <div className="p-col-6 ">
              <h6>Tipo de Empresa</h6>
              <SelecionaTipoFornecedorEmpresa
                className="w-100"
                tipoFornecedor={filtros.tipo_fornecedor}
                onSelect={setaTipoFornecedor}
              />
            </div>
            <div className="p-col-6 pr-0">
              <h6>Situação</h6>
              <SelecionaSituacaoEmpresa
                className="w-100"
                situacao={filtros.situacao}
                onSelect={setaSituacao}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
