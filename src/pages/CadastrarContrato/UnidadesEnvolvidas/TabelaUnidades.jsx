import React from "react";

export const TabelaUnidades = props => {
  const { disabilitado, unidadesSelecionadas, removerUnidadeSelecionada } =
    props;
  return (
    unidadesSelecionadas &&
    unidadesSelecionadas.length > 0 && (
      <div className="tabela-unidades-selecionadas pt-3">
        <table>
          <thead>
            <tr>
              <th>Código EOL</th>
              <th>Un. que recebem serviço</th>
              <th>Equipamento</th>
              <th>DRE</th>
              <th>Lote correspondente</th>
            </tr>
          </thead>
          <tbody>
            {unidadesSelecionadas.map((unidadeSelecionada, key) => {
              return (
                <tr key={key}>
                  <td>{unidadeSelecionada.unidade.cd_equipamento}</td>
                  <td>{unidadeSelecionada.unidade.nm_equipamento}</td>
                  <td>
                    {unidadeSelecionada.unidade.cd_tp_equipamento === 3 &&
                    unidadeSelecionada.unidade.cd_tp_ua === 19
                      ? "CEU"
                      : unidadeSelecionada.unidade.dc_tp_equipamento}
                  </td>
                  <td>
                    {
                      unidadeSelecionada.unidade
                        .nm_exibicao_diretoria_referencia
                    }
                  </td>
                  <td>
                    {unidadeSelecionada.lote}
                    {!disabilitado && (
                      <span
                        onClick={() => removerUnidadeSelecionada(key)}
                        className="delete"
                      >
                        x
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};
