import React from "react";

const Row = ({ registroTabela, id }) => {
  const keys = Object.keys(registroTabela);
  return (
    <tr key={registroTabela.key}>
      <th>{id + 1}</th>
      {keys.map(valor => (
        <td key={valor}>{registroTabela[valor]}</td>
      ))}
    </tr>
  );
};

export default Row;
