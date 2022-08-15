import React from "react";

export const TabelaUnidadesParaSelecionar = props => {
  const { unidades, todosSelecionados, checkUnidade, selecionarTodos } = props;
  return (
    <div className="tabela-unidades mt-4">
      <table className="tabela-resultado-buscas-unidades">
        <thead>
          <tr className="row">
            <th className="col-check">
              <label htmlFor="check" className="checkbox-label">
                <input
                  type="checkbox"
                  name="check"
                  checked={todosSelecionados}
                />
                <span
                  onClick={() => selecionarTodos()}
                  className="checkbox-custom"
                />{" "}
              </label>
            </th>
            <th className="col-2">Código EOL</th>
            <th className="col-3">Nome da Unidade</th>
            <th className="col-3">Endereço</th>
            <th className="col-dre">DRE</th>
            <th className="col-2">Tipo de Unidade</th>
          </tr>
        </thead>
        <tbody>
          {unidades.map((unidade, key) => {
            return (
              <tr key={key} className="row">
                <td className="col-check">
                  <label htmlFor="check" className="checkbox-label">
                    <input
                      type="checkbox"
                      name="check"
                      checked={unidade.checked}
                    />
                    <span
                      onClick={() => checkUnidade(key)}
                      className="checkbox-custom"
                    />{" "}
                  </label>
                </td>
                <td className="col-2">
                  <span className="text">{unidade.cd_equipamento}</span>
                </td>
                <td className="col-3">{unidade.nm_equipamento}</td>
                <td className="col-3">
                  {unidade.logradouro}, {unidade.bairro}
                </td>
                <td className="col-dre">
                  {unidade.nm_exibicao_diretoria_referencia}
                </td>
                <td className="col-2">
                  {unidade.cd_tp_equipamento === 3 && unidade.cd_tp_ua === 19
                    ? "CEU"
                    : unidade.dc_tp_equipamento}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
