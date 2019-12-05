import React, { useState, useEffect, Fragment } from "react";
import {
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
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
  }, [props.grupo, grupo.itens_de_verificacao]);

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
        disabled={props.modoVisualizacao}
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
    setAdicionar(true);
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

  const adicionarItem = () => {
    const index = itens.length + 1;
    itens.push({ descricao: descricao, item: index });
    atualizaEstadoItens(itens);
    props.mostraAlerta();
  };

  const alterarItem = () => {
    itens.filter(value => {
      if (item === value.item) {
        value.descricao = descricao;
        return value;
      }
      return itens;
    });
    atualizaEstadoItens(itens);
  };

  const atualizaEstadoItens = itens => {
    setItens([...itens]);
    setDescricao("");
    setItem("");
    fecharDialog();
    grupo.itens_de_verificacao = itens;
    setGrupo({ ...grupo });
    props.editar(props.index, grupo);
  };

  const excluirItem = () => {
    itens.filter((value, i) => {
      if (item === value.item) {
        itens.splice(i, 1);
      }
      return itens;
    });
    atualizaEstadoItens(itens);
    setAdicionar(true);
  };

  const descricaoTemplate = (rowData, column) => {
    return <div dangerouslySetInnerHTML={{ __html: rowData.descricao }} />;
  };


  const habilitaBotao =
    props.modoVisualizacao === false && grupo.nome ? false : true;
  const habilitarBotaoExcluir = adicionar ? true : false;
  const habilitaBotaoAdicionar =
    descricao === "" || descricao === null ? true : false;
  const footerVazio =
    "Ainda não existem itens de verificação adicionados no ateste";

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
                className="btn-coad-primary"
                label="Adicionar"
                disabled={habilitaBotaoAdicionar}
              />
            ) : (
              <Button
                onClick={alterarItem}
                className="btn-coad-primary"
                label="Alterar"
                disabled={habilitaBotaoAdicionar}
              />
            )}
            <Button
              onClick={fecharDialog}
              className="btn-coad-background-outline mx-2"
              label="Cancelar"
            />
            <Button
              className="btn-coad-background-outline mx-2"
              label="Excluir"
              disabled={habilitarBotaoExcluir}
              onClick={excluirItem}
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
          disabled={props.modoVisualizacao}
        />
      </FormGroup>
      <FormGroup>
        <Row>
          <Col>
            <Label>Lista de itens de verificação </Label>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              style={{ fontSize: "11px" }}
              className="px-1 mb-2"
              disabled={habilitaBotao}
              label="Adicionar Item"
              onClick={abrirDialog}
            />
          </Col>
        </Row>
        {itens.length > 0 ? (
          <DataTable
            value={itens}
            reorderableColumns={true}
            scrollable={true}
            scrollHeight={"300px"}
            className="datatable-strapd-coad"
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
        ) : (
          <div>
            <DataTable footer={footerVazio} className="datatable-footer-coad ">
              <Column header="" style={{ width: "5em" }} />
              <Column header="Itens de verificação" />
              <Column header="" style={{ width: "7em" }} />
            </DataTable>
          </div>
        )}
      </FormGroup>
    </Fragment>
  );
};

export default Grupo;
