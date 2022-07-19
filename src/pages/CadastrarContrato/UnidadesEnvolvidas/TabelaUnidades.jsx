import React, { useState, useEffect } from "react";
import { Collapse, CardBody, Card, Button } from "reactstrap";

export const TabelaUnidades = ({
  disabilitado,
  unidadesSelecionadas,
  removerUnidadeSelecionada,
}) => {
  const [lotes, setLotes] = useState([]);
  const [collapse, setCollapse] = useState([]);

  const toggle = index => {
    let newCollapse = [...collapse];
    newCollapse[index] = !newCollapse[index];
    setCollapse(newCollapse);
  };

  const excluirLote = lote => {
    lote.unidades.forEach(uni => {
      let index = unidadesSelecionadas.findIndex(x => x.unidade === uni);
      if (index >= 0) removerUnidadeSelecionada(index);
    });
  };

  useEffect(() => {
    let novosLotes = {};
    unidadesSelecionadas.forEach(uni => {
      if (novosLotes[uni.lote]) novosLotes[uni.lote].push(uni.unidade);
      else novosLotes[uni.lote] = [uni.unidade];
    });
    let arrayLotes = Object.keys(novosLotes).map((key, index) => ({
      lote: key,
      unidades: Object.values(novosLotes)[index],
    }));
    setLotes(arrayLotes);
  }, [unidadesSelecionadas, unidadesSelecionadas.length]);

  return (
    unidadesSelecionadas &&
    unidadesSelecionadas.length > 0 && (
      <div className="tabela-unidades-selecionadas pt-3">
        <h6>Lotes Adicionados</h6>
        {lotes.map((lote, index) => (
          <div className="accordion" key={index}>
            <div
              className="tabela-lotes"
              onClick={() => toggle(index)}
              style={{ cursor: "pointer" }}
            >
              <div className="mb-0 d-flex justify-content-end">
                <span className="w-100 titulo-lote">
                  Lote: <span className="font-weight-bold">{lote.lote}</span>
                </span>
                <button
                  type="button"
                  className="btn btn-link btn-unidades"
                  aria-expanded="true"
                  onClick={() => toggle(index)}
                >
                  {collapse[index] ? (
                    <i className="fas fa-chevron-up"></i>
                  ) : (
                    <i className="fas fa-chevron-down"></i>
                  )}
                  <span> Unidades</span>
                </button>
              </div>
            </div>
            <Collapse isOpen={collapse[index]}>
              <Card>
                <CardBody>
                  <p className="font-weight-bold">Unidades do Lote</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Código EOL</th>
                        <th>Nome da unidade</th>
                        <th>Tipo de unidade</th>
                        <th>DRE</th>
                        <th>Subprefeitura</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lote.unidades.map((unidadeSelecionada, key) => {
                        return (
                          <tr key={key}>
                            <td>{unidadeSelecionada.cd_equipamento}</td>
                            <td>{unidadeSelecionada.nm_equipamento}</td>
                            <td>
                              {unidadeSelecionada.cd_tp_equipamento === 3 &&
                              unidadeSelecionada.cd_tp_ua === 19
                                ? "CEU"
                                : unidadeSelecionada.dc_tp_equipamento}
                            </td>
                            <td>
                              {
                                unidadeSelecionada.nm_exibicao_diretoria_referencia
                              }
                            </td>
                            <td>{unidadeSelecionada.nomeSubprefeitura}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Button
                    className="button-red-outline float-right mt-2"
                    type="button"
                    onClick={() => excluirLote(lote)}
                    disabled={disabilitado}
                  >
                    Excluir Lote
                  </Button>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        ))}
      </div>
    )
  );
};
