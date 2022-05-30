import React, { useRef, useState } from "react";
import { Label } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import SelecionaProduto from "../../components/Contratos/SelecionaProduto";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FileUpload } from "primereact/fileupload";

const Produtos = ({ produtos, setProdutos, disabled }) => {
  const [produto, setProduto] = useState({});
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const inputFile = useRef(null);

  const adicionaProduto = () => {
    let newProduto = { ...produto };
    if (inputFile.current.files) {
      console.log(inputFile.current.files);
    }
    let newProdutos = [...produtos];
    newProdutos.push({ newProduto, ...produtoSelecionado });
    setProdutos(newProdutos);
    setProduto({});
    setProdutoSelecionado({});
  };

  const deletarProduto = index => {
    let newProdutos = [...produtos];
    newProdutos.splice(index, 1);
    setProdutos(newProdutos);
  };

  const colunaAcoes = (rowData, rowInfo) => {
    return (
      <span className="icones-acoes">
        <i className="fas fa-paperclip mr-3"></i>
        <i
          className="fas fa-trash-alt"
          onClick={() => deletarProduto(rowInfo.rowIndex)}
        ></i>
      </span>
    );
  };

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
            value={produto.qtd_total}
            format={false}
            onChange={e => {
              setProduto({
                ...produto,
                qtd_total: e.value,
              });
            }}
            disabled={disabled}
          />
        </div>

        <div className="p-col-4">
          <Label className="font-weight-bold w-100">Valor Unitario</Label>
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
          <div className="ml-auto">
            <FileUpload
              name="demo"
              mode="basic"
              ref={inputFile}
              chooseOptions={{
                label: "Anexar Ficha técnica",
                icon: "pi pi-paperclip",
                className: "btn-coad-background-outline",
              }}
              accept=".png, .pdf, .jpeg, .jpg"
              customUpload
              uploadHandler={() => {
                inputFile.current.clear();
              }}
            />
            <Button
              className="btn-coad-background-outline ml-3"
              onClick={adicionaProduto}
            >
              <i className="fas fa-plus mr-1" /> Adicionar Produto
            </Button>
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
            <Column field="qtd_total" header="Qtde. Total" />
            <Column field="valor_unitario" header="Valor Unit." />
            <Column field="valor_total" header="Valor Total" />
            <Column header="Ações" body={colunaAcoes} />
            {/* <Column
            field="data_encerramento"
            header="Data de Encerramento"
            body={textoDataEncerramento}
          /> */}
          </DataTable>
        </div>
      )}
    </>
  );
};

export default Produtos;
