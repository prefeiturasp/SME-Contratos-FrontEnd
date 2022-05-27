import React, { useState } from "react";
import moment from "moment";
import { Row, Col } from "reactstrap";
import { Modal } from "antd";
import "./styles.scss";

export function ModalHistoricoEdital({
  historico,
  abreModalHistorico,
  fechaModalHistorico,
}) {
  const [histSelecionado, setHistSelecionado] = useState(null);

  const retornaIniciais = email => {
    const nome = email.split(" ");
    let iniciais = "";
    nome.forEach((n, index) => {
      if (index <= 1) {
        iniciais = iniciais.concat(n.charAt(0)).toUpperCase();
      }
    });
    return iniciais;
  };

  const itemLogAtivo = (index, ativo) => {
    let hSelecionado;
    historico.forEach(h => {
      h.ativo = false;
    });
    if (!ativo) {
      historico[index].ativo = !ativo;
      hSelecionado = historico[index];
    } else {
      hSelecionado = null;
    }
    setHistSelecionado(hSelecionado);
  };

  const ajusta_nome = campo => {
    if (campo === "numero") {
      return "Número do Edital";
    } else if (campo === "status") {
      return "Status";
    } else if (campo === "processo") {
      return "Número do Processo";
    } else if (campo === "tipo_contratacao") {
      return "Tipo de Contratação";
    } else if (campo === "subtipo") {
      return "Subtipo";
    } else if (campo === "data_homologacao") {
      return "Data de Homologação";
    } else if (campo === "objeto") {
      return "Categoria de objeto";
    } else if (campo === "descricao_objeto") {
      return "Descrição do Objeto";
    }
  };

  const valor_field = field => {
    return histSelecionado.changes.find(obj => obj.field === field).to;
  };

  return (
    <Modal
      title="Histórico"
      visible={abreModalHistorico}
      width={1050}
      okText={"Fechar"}
      onOk={() => fechaModalHistorico(false)}
      onCancel={() => fechaModalHistorico(false)}
      maskClosable={false}
    >
      <section className="body-modal-historico">
        <div className="ml-1">
          <b>Usuário</b>
        </div>
        <div>
          <b>Ações</b>
        </div>
        <article>
          <section className="body-logs">
            {historico &&
              historico.length > 0 &&
              historico.map((hist, index) => {
                const { ativo } = hist;
                const iniciais = retornaIniciais(hist.user.email);
                return (
                  <div
                    key={index}
                    className={`${ativo && "ativo-item"} grid-item-log-edital`}
                    onClick={() => {
                      itemLogAtivo(index, ativo);
                    }}
                  >
                    <div className="usuario">
                      <div>{iniciais}</div>
                    </div>
                    <div className="descricao-edital">
                      <div
                        className="descicao-titulo-edital"
                        title={hist.action}
                      >
                        {hist.action === "CREATE" ? "CRIAÇÃO" : "EDIÇÃO"}
                      </div>
                      <div className="conta-usuario">{hist.user.email}</div>
                    </div>
                    <div className="descricao-edital">
                      {hist.updated_at !== undefined && (
                        <>
                          <div className="hora-edital">
                            {
                              moment(hist.updated_at, "YYYY-MM-DD HH:mm:ss")
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[0]
                            }
                          </div>
                          <div className="hora-edital">
                            {
                              moment(hist.updated_at, "YYYY-MM-DD HH:mm:ss")
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[1]
                            }
                          </div>
                        </>
                      )}
                      {hist.created_at !== undefined && (
                        <>
                          <div className="hora-edital">
                            {
                              moment(hist.created_at, "YYYY-MM-DD HH:mm:ss")
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[0]
                            }
                          </div>
                          <div className="hora-edital">
                            {
                              moment(hist.created_at, "YYYY-MM-DD HH:mm:ss")
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[1]
                            }
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
          </section>
        </article>
        <article className="detail-log ">
          <div />

          <div>
            <header>
              <div />
              {histSelecionado !== null ? (
                <div className="descricao-do-log-edital">
                  <div className="header-log">
                    <div className="usuario">
                      <div>{retornaIniciais(histSelecionado.user.email)}</div>
                    </div>
                    <div className="conta-usuario">
                      {histSelecionado.user.email}
                    </div>
                    <div>
                      {histSelecionado.updated_at !== undefined && (
                        <>
                          <div className="hora-edital">
                            {
                              moment(
                                histSelecionado.updated_at,
                                "YYYY-MM-DD HH:mm:ss",
                              )
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[0]
                            }
                          </div>
                          <div className="hora-edital">
                            {
                              moment(
                                histSelecionado.updated_at,
                                "YYYY-MM-DD HH:mm:ss",
                              )
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[1]
                            }
                          </div>
                        </>
                      )}
                      {histSelecionado.created_at !== undefined && (
                        <>
                          <div className="hora-edital">
                            {
                              moment(
                                histSelecionado.created_at,
                                "YYYY-MM-DD HH:mm:ss",
                              )
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[0]
                            }
                          </div>
                          <div className="hora-edital">
                            {
                              moment(
                                histSelecionado.created_at,
                                "YYYY-MM-DD HH:mm:ss",
                              )
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[1]
                            }
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {histSelecionado !== undefined &&
                    histSelecionado.action === "UPDATE" && (
                      <>
                        <div className="campo py-2">
                          <b>Lista de alterações</b>
                        </div>
                        <table className="table table-bordered table-edital">
                          <col style={{ width: "30%" }} />
                          <col style={{ width: "30%" }} />
                          <col style={{ width: "40%" }} />
                          <thead>
                            <tr className="table-head-edital">
                              <th>CAMPO</th>
                              <th>DE</th>
                              <th>PARA</th>
                            </tr>
                          </thead>

                          <tbody>
                            {histSelecionado.changes.map((change, index) => (
                              <tr
                                key={`${index}_${change.field}`}
                                className="table-body-edital"
                              >
                                <td>{ajusta_nome(change.field)}</td>
                                <td>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: change.from,
                                    }}
                                  />
                                </td>
                                <td>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: change.to,
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {histSelecionado.grupos_obrigacoes && (
                          <div className="campo mt-3 py-2">
                            <b>Alterações nos grupos de obrigações</b>
                          </div>
                        )}
                        {histSelecionado.grupos_obrigacoes &&
                          histSelecionado.grupos_obrigacoes.map(
                            (grupo, index) => (
                              <>
                                {grupo.itens_obrigacao.from && (
                                  <table
                                    key={`${index}_${grupo.nome.from}_from`}
                                    className="table table-bordered table-edital"
                                  >
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "30%" }} />
                                    <col style={{ width: "50%" }} />
                                    <thead>
                                      <tr className="table-head-edital"></tr>
                                    </thead>
                                    <tbody>
                                      <tr className="table-head-edital">
                                        <th colSpan="3">DE</th>
                                      </tr>
                                      {grupo.itens_obrigacao.from.map(
                                        (situacao, i) => (
                                          <>
                                            <tr
                                              key={`${i}_${situacao.item}_from`}
                                              className="table-body-edital"
                                            >
                                              <td>{grupo.nome.from}</td>
                                              <td>{situacao.item}</td>
                                              <td>
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: situacao.descricao,
                                                  }}
                                                />{" "}
                                              </td>
                                            </tr>
                                          </>
                                        ),
                                      )}
                                    </tbody>
                                  </table>
                                )}
                                {grupo.itens_obrigacao.to && (
                                  <table
                                    key={`${index}_${grupo.nome.to}_to`}
                                    className="table table-bordered table-edital"
                                  >
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "30%" }} />
                                    <col style={{ width: "50%" }} />
                                    <thead>
                                      <tr className="table-head-edital"></tr>
                                    </thead>
                                    <tbody>
                                      <tr className="table-head-edital">
                                        <th colSpan="3">PARA</th>
                                      </tr>
                                      {grupo.itens_obrigacao.to.map(
                                        (situacao, i) => (
                                          <>
                                            <tr
                                              key={`${i}_${situacao.item}_to`}
                                              className="table-body-edital"
                                            >
                                              <td>{grupo.nome.to}</td>
                                              <td>{situacao.item}</td>
                                              <td>
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: situacao.descricao,
                                                  }}
                                                />{" "}
                                              </td>
                                            </tr>
                                          </>
                                        ),
                                      )}
                                    </tbody>
                                  </table>
                                )}
                                <hr className="linha" />
                              </>
                            ),
                          )}
                      </>
                    )}

                  {histSelecionado !== undefined &&
                    histSelecionado.action === "CREATE" && (
                      <>
                        <Row>
                          <Col className="campo col-6 mt-2 mb-2">
                            <b>Criação de edital</b>
                          </Col>
                          <Col className="col-5 mt-2 ">
                            <b>Criado em: </b>
                            {
                              moment(
                                valor_field("criado_em"),
                                "YYYY-MM-DD HH:mm:ss",
                              )
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[0]
                            }{" "}
                            -
                            {
                              moment(
                                valor_field("criado_em"),
                                "YYYY-MM-DD HH:mm:ss",
                              )
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[1]
                            }
                          </Col>
                          <Col className="campo-edital col-6">
                            <b>Edital:</b> {valor_field("numero")}
                          </Col>
                          <Col className="col-5">
                            {" "}
                            <b>Status:</b> {valor_field("status")}
                          </Col>
                          <Col className="campo-edital col-6">
                            {" "}
                            <b>Processo:</b> {valor_field("processo")}
                          </Col>
                          <Col className="col-5">
                            <b>Homologação: </b>
                            {
                              moment(
                                valor_field("data_homologacao"),
                                "YYYY-MM-DD HH:mm:ss",
                              )
                                .format("DD/MM/YYYY HH:mm:ss")
                                .split(" ")[0]
                            }
                          </Col>
                          <Col className="campo-edital col-12">
                            <b>Tipo:</b> {valor_field("tipo_contratacao")}
                          </Col>
                          <Col className="campo-edital col-12">
                            <b>Subtipo:</b> {valor_field("subtipo")}
                          </Col>
                          <Col className="campo-edital col-12 mt-4">
                            <b>Objeto:</b> {valor_field("objeto")}
                          </Col>
                          <Col className="campo-edital col-12 mt-3">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: valor_field("descricao_objeto"),
                              }}
                            />
                          </Col>
                        </Row>
                      </>
                    )}
                </div>
              ) : (
                <div />
              )}
            </header>
          </div>
        </article>
      </section>
    </Modal>
  );
}
