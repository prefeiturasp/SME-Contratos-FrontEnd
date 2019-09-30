import React from "react";
import { textColor } from "./helpers";

const Row = ({ registroTabela, id }) => {
  const keys = Object.keys(registroTabela);
  return (
    <tr key={registroTabela.key}>
      <th>{id + 1}</th>
      {keys.map(valor => (
        <td className={textColor(registroTabela[valor])} key={valor}>
          {registroTabela[valor]}
        </td>
      ))}
    </tr>
  );
};

export default Row;
