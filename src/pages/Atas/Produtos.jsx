import React, { useRef, useState } from "react";
import { Label } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import SelecionaProduto from "../../components/Contratos/SelecionaProduto";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FileUpload } from "primereact/fileupload";
import { fileToBase64 } from "../../utils/fileToBase64";

const Produtos = ({ produtos, setProdutos, disabled }) => {
  const [produto, setProduto] = useState({});
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const inputFile = useRef(null);

  const adicionaProduto = async () => {
    let newProduto = { ...produto };
    if (inputFile.current.files) {
      newProduto.anexo = inputFile.current.files[0];
      newProduto.anexo.objectURL = window.URL.createObjectURL(newProduto.anexo);
      newProduto.anexo.base64 = await fileToBase64(newProduto.anexo);
      clearInputFile();
    }
    let newProdutos = [...produtos];
    newProdutos.push({ ...newProduto, ...produtoSelecionado });
    setProdutos(newProdutos);
    setProduto({});
    setProdutoSelecionado({});
  };

  const deletarProduto = index => {
    let newProdutos = [...produtos];
    newProdutos.splice(index, 1);
    setProdutos(newProdutos);
  };

  const abrirAnexo = rowData => {
    if (rowData.anexo)
      window.open(
        rowData.anexo.objectURL ? rowData.anexo.objectURL : rowData.anexo,
      );
  };

  const colunaAcoes = (rowData, rowInfo) => {
    return (
      <span className="icones-acoes">
        <i
          className="fas fa-paperclip mr-3"
          onClick={() => abrirAnexo(rowData)}
        ></i>
        <i
          className="fas fa-trash-alt"
          onClick={() => deletarProduto(rowInfo.rowIndex)}
        ></i>
      </span>
    );
  };

  const clearInputFile = () => {
    inputFile.current.clear();
    inputFile.current.files = null;
  };

  let habilitaBotao =
    produtoSelecionado.nome &&
    produto.quantidade_total &&
    produto.valor_unitario &&
    produto.valor_total &&
    inputFile.current.files;

  return (
    <>
      <div className="p-grid">
        <div className="p-col-8">
          <SelecionaProduto
            id="numeroAta"
            className="w-100"
            value={produtoSelecionado}
            onSelect={event => setProdutoSelecionado(event.value)}
            disabled={disabled}
          />
        </div>

        <div className="p-col-4">
          <Label className="font-weight-bold">Unidade de Medida</Label>
          <InputText
            className="w-100"
            value={produtoSelecionado.unidade_medida || ""}
            disabled={true}
          />
        </div>

        <div className="p-col-4">
          <Label className="font-weight-bold w-100">Quantidade Total</Label>
          <InputNumber
            className="w-100"
            value={produto.quantidade_total}
            format={false}
            onChange={e => {
              setProduto({
                ...produto,
                quantidade_total: e.value,
              });
            }}
            disabled={disabled}
          />
        </div>

        <div className="p-col-4">
          <Label className="font-weight-bold w-100">Valor Unitário</Label>
          <InputNumber
            className="w-100"
            value={produto.valor_unitario}
            format={false}
            onChange={e => {
              setProduto({
                ...produto,
                valor_unitario: e.value,
              });
            }}
            disabled={disabled}
          />
        </div>

        <div className="p-col-4">
          <Label className="font-weight-bold w-100">Valor Total</Label>
          <InputNumber
            className="w-100"
            value={produto.valor_total}
            format={false}
            onChange={e => {
              setProduto({
                ...produto,
                valor_total: e.value,
              });
            }}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="p-grid mt-3">
        <div className="p-col-12">
          <div className="button-row">
            <div>
              <Button
                className="btn-coad-background-outline ml-3"
                onClick={adicionaProduto}
                disabled={disabled || !habilitaBotao}
              >
                <i className="fas fa-plus mr-1" /> Adicionar Produto
              </Button>
            </div>

            <div>
              <FileUpload
                name="demo"
                mode="basic"
                ref={inputFile}
                chooseOptions={{
                  label: "Anexar Ficha Técnica",
                  icon: "pi pi-paperclip",
                  className: "btn-coad-background-outline",
                }}
                accept=".png, .pdf, .jpeg, .jpg"
                customUpload
                onSelect={() => {
                  setProduto({ ...produto });
                }}
                uploadHandler={() => {
                  clearInputFile();
                  setProduto({ ...produto });
                }}
                disabled={disabled}
              />
              <div className="formatos-aceitos">PDF, PNG, JPG ou JPEG</div>
            </div>
          </div>
        </div>
      </div>
      {produtos.length > 0 && (
        <div className="row mt-4">
          <DataTable
            value={produtos}
            className="datatable-strapd-coad tabela-atas w-100"
            paginatorTemplate="PrevPageLink PageLinks NextPageLink"
            emptyMessage="Não existe informação para os critérios de busca utilizados"
            selectionMode="single"
            isDataSelectable={false}
          >
            <Column field="nome" header="Nome do Produto" />
            <Column field="unidade_medida" header="Unid." />
            <Column field="quantidade_total" header="Qtde. Total" />
            <Column field="valor_unitario" header="Valor Unit." />
            <Column field="valor_total" header="Valor Total" />
            <Column header="Ações" body={colunaAcoes} />
          </DataTable>
        </div>
      )}
    </>
  );
};

export default Produtos;
