import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Label } from "reactstrap";
import { getListaDeProdutos } from "../../../service/Produtos.service";

const SelecionaProduto = props => {
  const [produtos, setProdutos] = useState([]);
  const { disabled, value, onSelect } = props;

  useEffect(() => {
    (async () => {
      try {
        const produtos = await getListaDeProdutos();
        setProdutos(produtos.results);
      } catch (erro) {
        throw erro;
      }
    })();
  }, []);

  return (
    <>
      <Label className="font-weight-bold">Nome do Produto</Label>
      <br />
      <Dropdown
        {...props}
        optionLabel="nome"
        options={produtos}
        value={value}
        onChange={onSelect}
        placeholder="Selecione..."
        disabled={disabled}
      />
    </>
  );
};

export default SelecionaProduto;
