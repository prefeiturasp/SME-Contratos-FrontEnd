import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { FormGroup, Label } from "reactstrap";
import { getListaDeEditais } from "../../../service/Editais.service";

const SelecionaEdital = ({ value, onSelect }) => {
  const [editais, setEditais] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const editais = await getListaDeEditais();
        setEditais(editais);
      } catch (erro) {
        console.log(erro);
      }
    })();
  }, []);

  return (
    <FormGroup className="p-grid p-fluid p-2">
      <Label>Vincular Edital</Label>
      <br />
      <Dropdown
        optionLabel="numero"
        options={editais}
        value={value}
        onChange={onSelect}
        placeholder="Selecione..."
        showClear={true}
        autoWidth={true}
        className="pb-1"
        style={{ borderColor: "#ced4da" }}
      />
    </FormGroup>
  );
};

export default SelecionaEdital;
