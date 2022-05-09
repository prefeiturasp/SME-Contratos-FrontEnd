import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Row, Col } from "reactstrap";

import { redirect } from "../../../utils/redirect";
import {
  ARMAZENABILIDADE_PRODUTO,
  CATEGORIA_PRODUTO,
  DURABILIDADE_PRODUTO,
  GRUPO_ALIMENTAR_PRODUTO,
  SITUACAO_PRODUTO,
} from "../../../pages/Produtos/constantes";

export function BuscaProdutosForm({ onBuscarClick, onLimparClick }) {
  const [filtros, setFiltros] = useState({});
  console.log(filtros, "filtros");

  const handleClickBuscar = () => {
    onBuscarClick(filtros);
  };

  const limparFiltros = () => {
    setFiltros({
      nome: "",
      situacao: "",
      categoria: "",
      grupo_alimentar: "",
      durabilidade: "",
      armazenabilidade: "",
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
      <Row>
        <Col lg={12} xl={12}>
          <span className="float-right">
            <Button
              icon="pi pi-file"
              label="Novo Produto"
              style={{ marginBottom: ".80em" }}
              className="btn-coad-background-outline"
              onClick={() => {
                redirect(`#/produtos/`);
              }}
            />
          </span>
        </Col>
      </Row>
      <div className="p-grid ">
        <div className="card card-w-title filtro">
          <div className="p-grid">
            <div className="p-col-6">
              <h6>Nome do Produto</h6>
              <InputText
                className="w-100 pr-2"
                value={filtros.nome}
                format={false}
                onChange={e =>
                  setFiltros({ ...filtros, nome: e.target.value.toUpperCase() })
                }
                placeholder="Digite o nome"
              />
            </div>
            <div className="p-col-6 ">
              <h6>Situação</h6>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={SITUACAO_PRODUTO}
                value={filtros.situacao}
                onChange={e =>
                  setFiltros({ ...filtros, situacao: e.target.value })
                }
                placeholder="Selecione"
              />
            </div>
            <div className="p-col-6 ">
              <h6>Categoria</h6>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={CATEGORIA_PRODUTO}
                value={filtros.categoria}
                onChange={e =>
                  setFiltros({ ...filtros, categoria: e.target.value })
                }
                placeholder="Selecione"
              />
            </div>
            <div className="p-col-6 ">
              <h6>Grupo Alimentar</h6>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={GRUPO_ALIMENTAR_PRODUTO}
                value={filtros.grupo_alimentar}
                onChange={e =>
                  setFiltros({ ...filtros, grupo_alimentar: e.target.value })
                }
                placeholder="Selecione"
              />
            </div>
            <div className="p-col-6">
              <h6>Durabilidade</h6>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={DURABILIDADE_PRODUTO}
                value={filtros.durabilidade}
                onChange={e =>
                  setFiltros({ ...filtros, durabilidade: e.target.value })
                }
                placeholder="Selecione"
              />
            </div>
            <div className="p-col-6">
              <h6>Armazenabilidade</h6>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={ARMAZENABILIDADE_PRODUTO}
                value={filtros.armazenabilidade}
                onChange={e =>
                  setFiltros({ ...filtros, armazenabilidade: e.target.value })
                }
                placeholder="Selecione"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
