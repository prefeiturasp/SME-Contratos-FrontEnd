import React, { useState, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Label } from "reactstrap";
import { getListaDotacoes } from "../../../service/DotacaoOrcamentaria.service";

const SelecionaDotacaoOrcamentaria = props => {
  const [dotacoes, setDotacoes] = useState([]);
  const { disabled, value, onSelect } = props;

  useEffect(() => {
    (async () => {
      try {
        const dotacoesPayload = await getListaDotacoes();
        setDotacoes(dotacoesPayload.results);
      } catch (erro) {
        throw erro;
      }
    })();
  }, []);

  return (
    <>
      <Label>Dotações Orçamentárias</Label>
      <br />
      <MultiSelect
        {...props}
        optionLabel="numero_dotacao"
        options={dotacoes}
        value={value}
        onChange={onSelect}
        placeholder="Selecione..."
        disabled={disabled}
        maxSelectedLabels={1}
        selectedItemsLabel={"{0} dotações selecionadas"}
      />
    </>
  );
};

export default SelecionaDotacaoOrcamentaria;
