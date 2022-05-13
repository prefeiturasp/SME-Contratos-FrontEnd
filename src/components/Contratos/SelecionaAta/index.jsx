import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Label } from "reactstrap";
import { getAtasPorEdital } from "../../../service/Atas.service";

const SelecionaAta = props => {
  const [atas, setAtas] = useState([]);
  const { disabled, edital, value, onSelect } = props;

  useEffect(() => {
    (async () => {
      try {
        if (edital) {
          const atas = await getAtasPorEdital(edital.uuid);
          setAtas(atas);
        }
      } catch (erro) {
        throw erro;
      }
    })();
  }, [edital]);

  return (
    <>
      <Label>Número da Ata</Label>
      <br />
      <Dropdown
        {...props}
        optionLabel="numero"
        options={atas}
        value={value}
        onChange={onSelect}
        placeholder="Selecione..."
        disabled={disabled}
      />
    </>
  );
};

export default SelecionaAta;
