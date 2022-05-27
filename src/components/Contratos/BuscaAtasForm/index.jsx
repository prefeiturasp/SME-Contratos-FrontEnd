import React, { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputMask } from "primereact/inputmask";
import { Row, Col } from "reactstrap";
import { InputText } from "primereact/inputtext";

import { SelecionaEmpresa } from "../SelecionaEmpresa";
import { SelecionaTipoServico } from "../SelecionaTipoServico";
import { SelecionaData } from "../SelecionaData";
import { redirect } from "../../../utils/redirect";
import SelecionaSituacaoAta from "../SelecionaSituacaoAta";
import "./style.scss";

export function BuscaAtasForm({ onBuscarClick, onLimparClick }) {
  const [filtros, setFiltros] = useState({});

  const setaSituacao = status => {
    setFiltros({ ...filtros, status });
  };

  const setaEmpresa = empresa => {
    setFiltros({ ...filtros, empresa });
  };

  const setaTipoServico = objeto => {
    setFiltros({ ...filtros, objeto });
  };

  const setaDataInicialAta = data_inicial => {
    if (data_inicial) {
      setFiltros({ ...filtros, data_inicial });
    }
  };

  const setaDataFinalAta = data_final => {
    if (data_final) {
      setFiltros({ ...filtros, data_final });
    }
  };

  const handleClickBuscar = () => {
    onBuscarClick(filtros);
  };

  const limparFiltros = () => {
    setFiltros({
      numero: "",
      objeto: "",
      empresa: "",
      cnpj_empresa: "",
      status: "",
      data_inicial: "",
      data_final: "",
    });
    onLimparClick();
  };

  const footer = (
    <span>
      <Button
        className="float-right"
        label="Consultar"
        style={{ marginRight: ".25em" }}
        onClick={handleClickBuscar}
      />
      <Button
        className="float-right btn-coad-background-outline"
        label="Limpar Filtros"
        style={{ marginRight: ".25em" }}
        onClick={limparFiltros}
      />
    </span>
  );

  return (
    <Card footer={footer} className="filtro filtroBorda">
      <Row className="filtro-head-ata">
        <Col lg={12} xl={6} className="float-left">
          <i className="pi pi-filter-fill"></i>Filtrar Atas
        </Col>

        <Col lg={12} xl={6}>
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
      <div className="p-grid ata-grid p-fluid">
        <div className="card card-w-title-ata filtro">
          <div className="p-grid ata-grid">
            <div className="p-col-6">
              <h6>Número da Ata</h6>
              <InputText
                className="w-100"
                value={filtros.numero}
                onChange={e =>
                  setFiltros({ ...filtros, numero: e.target.value })
                }
                placeholder="Digite o número da Ata"
              />
            </div>

            <div className="p-col-6 ">
              <h6>Objeto</h6>
              <SelecionaTipoServico
                tipoServico={filtros.objeto}
                onSelect={setaTipoServico}
              />
            </div>

            <div className="p-col-6">
              <h6>Nome da Empresa</h6>
              <SelecionaEmpresa
                empresa={filtros.empresa}
                onSelect={setaEmpresa}
              />
            </div>

            <div className="p-col-6 ">
              <h6>CNPJ</h6>
              <InputMask
                mask="99.999.999/9999-99"
                value={filtros.cnpj_empresa}
                onChange={e =>
                  setFiltros({ ...filtros, cnpj_empresa: e.target.value })
                }
                autoClear={false}
                placeholder="Ex: XX.XXX.XXX/XXXX-XX"
              />
            </div>

            <div className="p-col-6">
              <h6>Status</h6>
              <SelecionaSituacaoAta
                situacao={filtros.status}
                onSelect={setaSituacao}
              />
            </div>

            <div className="p-col-6">
              <h6>Período de Encerramento</h6>
              <div className="p-grid">
                <div className="p-col-6">
                  <SelecionaData
                    placeholder={"De"}
                    data={filtros.data_inicial}
                    maxDate={filtros.data_final}
                    onSelect={setaDataInicialAta}
                  />
                </div>
                <div className="p-col-6">
                  <SelecionaData
                    placeholder={"Até"}
                    data={filtros.data_final}
                    minDate={filtros.data_inicial}
                    onSelect={setaDataFinalAta}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
