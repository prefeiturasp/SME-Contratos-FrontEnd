import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { FormGroup, Label } from "reactstrap";
import { getListaDeEditais } from "../../../service/Editais.service";

const SelecionaEdital = ({ disabled, editalSalvo, value, onSelect }) => {
  const [editais, setEditais] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const editais = await getListaDeEditais();
        setEditais(editais);
        if (editalSalvo) {
          const arr = editais.filter(el => el.uuid === editalSalvo.uuid);
          if (arr.length) onSelect({ value: arr[0] });
        }
      } catch (erro) {
        console.error(erro);
      }
    })();
  }, [editalSalvo, onSelect]);

  return (
    <FormGroup className="p-grid p-fluid p-2">
      <Label>Número do Edital</Label>
      <br />
      <Dropdown
        optionLabel="numero"
        options={editais}
        value={value}
        onChange={onSelect}
        placeholder="Selecione..."
        autoWidth={true}
        className="pb-1"
        disabled={disabled}
        style={{ borderColor: "#ced4da" }}
      />
    </FormGroup>
  );
};

export default SelecionaEdital;
