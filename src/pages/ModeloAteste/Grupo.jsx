import React, { useState, useEffect, Fragment } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";

const Grupo = props => {
  const [grupo, setGrupo] = useState({});
  const [visivel, setVisivel] = useState(false);
  const [itens, setItens] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [item, setItem] = useState("");
  const [adicionar, setAdicionar] = useState(true);

  useEffect(() => {
    if (props.grupo) {
      setGrupo(props.grupo);
      if (grupo.itens_de_verificacao) {
        setItens(grupo.itens_de_verificacao);
      }
    }
  });

  const editaNomeGrupo = value => {
    grupo.nome = value;
    setGrupo({ ...grupo });
    props.editar(props.index, grupo);
  };

  const actionTemplate = (rowData, column) => {
    return (
      <Button
        onClick={evet => populaModal(rowData, column)}
        className="btn-coad-background-outline"
        label="Editar"
      />
    );
  };

  const populaModal = (conteudo, coluna) => {
    setAdicionar(false);
    abrirDialog();
    setDescricao(conteudo.descricao);
    setItem(conteudo.item);
  };

  const fecharDialog = () => {
    setVisivel(false);
  };

  const abrirDialog = () => {
    setVisivel(true);
  };

  const iconTemplate = (rowData, column) => {
    return (
      <div className="d-flex justify-content-center">
        <i className="fas fa-lg fa-arrows-alt-v" />
      </div>
    );
  };

  const alterarItem = () => {
    itens.filter(value => {
      if (item === value.item) {
        value.descricao = descricao;
      }
    });
    setItens([...itens]);
    setDescricao("");
    fecharDialog();
    grupo.itens_de_verificacao = itens;
    setGrupo({ ...grupo });
    props.editar(props.index, grupo);
  };

  const adicionarItem = () => {
    const index = itens.length + 1;
    itens.push({ descricao: descricao, item: index });
    setItens([...itens]);
    setDescricao("");
    fecharDialog();
    grupo.itens_de_verificacao = itens;
    setGrupo({ ...grupo });
    props.editar(props.index, grupo);
  };

  const descricaoTemplate = (rowData, column) => {
    return <div dangerouslySetInnerHTML={{ __html: rowData.descricao }} />;
  };

  const habilitaBotao = grupo.nome ? false : true;
  return (
    <Fragment>
      <Dialog
        header={
          adicionar
            ? "Adicionar Item de verificação"
            : "Editar Item de verificação"
        }
        visible={visivel}
        style={{ width: "60vw" }}
        modal={true}
        onHide={fecharDialog}
      >
        <FormGroup>
          <Label className="font-weight-bold">Item de verificação</Label>
          <br />
          <Editor
            style={{ height: "120px" }}
            value={descricao}
            headerTemplate={
              <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button
                  className="ql-underline"
                  aria-label="Underline"
                ></button>
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
              </span>
            }
            onTextChange={e => setDescricao(e.htmlValue)}
          />
        </FormGroup>

        <FormGroup>
          <FormGroup className="d-flex flex-row-reverse mt-3">
            {adicionar ? (
              <Button
                onClick={adicionarItem}
                className="btn-coad-primary p-1"
                label="Adicionar"
              />
            ) : (
              <Button
                onClick={alterarItem}
                className="btn-coad-primary p-1"
                label="Alterar"
              />
            )}
            <Button
              onClick={fecharDialog}
              className="btn-coad-background-outline p-1 mx-2"
              label="Cancelar"
            />
            <Button
              className="btn-coad-background-outline p-1 mx-2"
              label="Excluir"
              disabled={true}
            />
          </FormGroup>
        </FormGroup>
      </Dialog>
      <FormGroup>
        <Label>Nome de grupo</Label>
        <Input
          value={grupo ? grupo.nome : ""}
          onChange={e => editaNomeGrupo(e.target.value)}
          autocomplete="Off"
        />
      </FormGroup>
      <FormGroup>
        <Label>Lista de itens de verificação </Label>
        <DataTable
          value={itens}
          reorderableColumns={true}
          scrollable={true}
          scrollHeight={"300px"}
        >
          <Column
            body={iconTemplate}
            style={{ width: "5em", align: "center" }}
          />
          <Column
            field="descricao"
            header="Itens de verificação"
            body={descricaoTemplate}
          />
          <Column body={actionTemplate} style={{ width: "7em" }} />
        </DataTable>
      </FormGroup>
      <div>
        <button
          disabled={habilitaBotao}
          onClick={abrirDialog}
          className="btn btn-link font-weight-bold"
        >
          Adicionar novo item de verificação
        </button>
      </div>
    </Fragment>
  );
};

export default Grupo;
