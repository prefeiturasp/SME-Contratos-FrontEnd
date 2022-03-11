import React, { useState, useEffect, Fragment } from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import EditorHeader from "../../components/Shared/EditorHeader";
import * as R from "ramda";

const Grupo = (props) => {
  const [grupo, setGrupo] = useState({});
  const [visivel, setVisivel] = useState(false);
  const [itens, setItens] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState();
  const [novoItem, setNovoItem] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  useEffect(() => {
    if (props.grupo) {
      setGrupo(props.grupo || {});
      if (grupo.itens_de_obrigacao) {
        setItens(grupo.itens_de_obrigacao);
      }
    }
  }, [props.grupo, grupo.itens_de_obrigacao]);

  const editaNomeGrupo = (value) => {
    grupo.nome = value;
    setGrupo({ ...grupo });
    props.editar(props.index, grupo);
  };

  const actionTemplate = (rowData, column) => {
    return (
      <Button
        onClick={() => populaModal(rowData, column)}
        className="btn-coad-background-outline"
        label="Editar"
        disabled={props.modoVisualizacao}
      />
    );
  };

  const populaModal = (conteudo, coluna) => {
    abrirDialog();
    setNovoItem(conteudo.item);
    setNovaDescricao(conteudo.descricao);
    setItemSelecionado(conteudo);
  };

  const fecharDialog = () => {
    setNovaDescricao("");
    setNovoItem("");
    setItemSelecionado(null);
    setVisivel(false);
  };

  const abrirDialog = () => {
    setVisivel(true);
  };

  const adicionarItem = () => {
    atualizaEstado([...itens, { item: novoItem, descricao: novaDescricao }]);
    props.mostraAlerta();
  };

  const alterarItem = () => {
    atualizaEstado(
      R.update(
        R.indexOf(itemSelecionado, itens),
        { item: novoItem, descricao: novaDescricao },
        itens
      )
    );
  };

  const excluirItem = () => {
    atualizaEstado(R.remove(R.indexOf(itemSelecionado, itens), 1, itens));
  };

  const atualizaEstado = (itens) => {
    setItens(itens);
    fecharDialog();
    grupo.itens_de_obrigacao = itens;
    setGrupo({ ...grupo });
    props.editar(props.index, grupo);
  };

  const descricaoTemplate = (rowData, column) => {
    return <div className="mt-3" dangerouslySetInnerHTML={{ __html: rowData.descricao }} />;
  };

  const habilitaBotao =
    props.modoVisualizacao === false && grupo.nome;
  const footerVazio =
    "Ainda não existem itens de obrigação adicionados ao edital.";

  return (
    <Fragment>
      <Dialog
        header={itemSelecionado ? "Editar Item" : "Adicionar Item de obrigação"}
        visible={visivel}
        style={{ width: "60vw" }}
        modal={true}
        onHide={fecharDialog}
      >
        <br />
        <Row>
          <Col lg={4} xl={4}>
            <label htmlFor="item">Item</label>
            <br />
            <InputText
              value={novoItem}
              onChange={(e) => setNovoItem(e.target.value || "")}
              placeholder="Digitar item"
              className="w-100"
            />
          </Col>
          <Col lg={8} xl={8} className="p-fluid">
            <FormGroup>
              <Label className="font-weight-bold">Item de obrigação</Label>
              <br />
              <Editor
                style={{ height: "120px" }}
                value={novaDescricao}
                headerTemplate={<EditorHeader />}
                onTextChange={(e) => setNovaDescricao(e.htmlValue || "")}
                className="editor-coad"
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <FormGroup className="d-flex flex-row-reverse mt-3">
            {!itemSelecionado && (
              <Button
                onClick={adicionarItem}
                className="btn-coad-primary"
                label="Adicionar"
                disabled={!novoItem.length || !novaDescricao.length}
              />
            )}
            {itemSelecionado && (
              <Button
                onClick={alterarItem}
                className="btn-coad-primary"
                label="Alterar"
                disabled={!novoItem.length || !novaDescricao.length}
              />
            )}
            <Button
              onClick={fecharDialog}
              className="btn-coad-background-outline mx-2"
              label="Cancelar"
            />
            {itemSelecionado && (
              <Button
                className="btn-coad-background-outline mx-2"
                label="Excluir"
                onClick={excluirItem}
              />
            )}
          </FormGroup>
        </FormGroup>
      </Dialog>
      <FormGroup>
        <Label className="font-weight-bold">Nome de grupo</Label>
        <Input
          value={grupo.nome || ""}
          autoFocus
          onChange={(e) => editaNomeGrupo(e.target.value)}
          autoComplete="Off"
          disabled={props.modoVisualizacao}
        />
      </FormGroup>
      <FormGroup>
        <Row>
          <Col>
            <Label className="font-weight-bold">
              Lista de itens de obrigação{" "}
            </Label>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              style={{ fontSize: "11px" }}
              className="px-1 mb-2"
              disabled={!habilitaBotao}
              label="Adicionar Item"
              onClick={abrirDialog}
            />
          </Col>
        </Row>
        {itens.length > 0 ? (
          <DataTable
            value={itens}
            resizableColumns={true}
            columnResizeMode="fit"
            scrollable={true}
            scrollHeight={"300px"}
            className="datatable-strapd-coad"
          >
            <Column header="Item" field="item" style={{ width: "10%" }} />
            <Column
              field="descricao"
              header="Itens de obrigação"
              body={descricaoTemplate}
            />
            <Column body={actionTemplate} style={{ width: "7em" }} />
          </DataTable>
        ) : (
          <div>
            <DataTable emptyMessage={footerVazio} className="datatable-footer-coad ">
              <Column header="" style={{ width: "5em" }} />
              <Column header="Itens de obrigação" />
              <Column header="" style={{ width: "7em" }} />
            </DataTable>
          </div>
        )}
      </FormGroup>
    </Fragment>
  );
};

export default Grupo;
