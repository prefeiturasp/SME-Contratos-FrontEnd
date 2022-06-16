import React, { useState } from "react";
import moment from "moment";
import { Row, Col, Container } from "reactstrap";
import { Modal } from "antd";
import "./styles.scss";

export function ModalHistoricoAta({
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
      return "Número da Ata";
    } else if (campo === "status") {
      return "Status";
    } else if (campo === "edital") {
      return "Número do Edital";
    } else if (campo === "data_assinatura") {
      return "Data de Assinatura";
    } else if (campo === "data_encerramento") {
      return "Data de Encerramento";
    } else if (campo === "vigencia") {
      return "Vigência";
    } else if (campo === "unidade_vigencia") {
      return "Unidade Vigência";
    } else if (campo === "empresa") {
      return "Empresa";
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
      <Container className="container-atas">
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
                      className={`${ativo && "ativo-item"} grid-item-log-ata`}
                      onClick={() => {
                        itemLogAtivo(index, ativo);
                      }}
                    >
                      <div className="usuario">
                        <div>{iniciais}</div>
                      </div>
                      <div className="descricao-ata">
                        <div
                          className="descicao-titulo-ata"
                          title={hist.action}
                        >
                          {hist.action === "CREATE" ? "CRIAÇÃO" : "EDIÇÃO"}
                        </div>
                        <div className="conta-usuario">{hist.user.email}</div>
                      </div>
                      <div className="descricao-ata">
                        {hist.updated_at !== undefined && (
                          <>
                            <div className="hora-ata">
                              {
                                moment(hist.updated_at, "YYYY-MM-DD HH:mm:ss")
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[0]
                              }
                            </div>
                            <div className="hora-ata">
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
                            <div className="hora-ata">
                              {
                                moment(hist.created_at, "YYYY-MM-DD HH:mm:ss")
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[0]
                              }
                            </div>
                            <div className="hora-ata">
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
                  <div className="descricao-do-log-ata">
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
                            <div className="hora-ata">
                              {
                                moment(
                                  histSelecionado.updated_at,
                                  "YYYY-MM-DD HH:mm:ss",
                                )
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[0]
                              }
                            </div>
                            <div className="hora-ata">
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
                            <div className="hora-ata">
                              {
                                moment(
                                  histSelecionado.created_at,
                                  "YYYY-MM-DD HH:mm:ss",
                                )
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[0]
                              }
                            </div>
                            <div className="hora-ata">
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
                          <table className="table table-bordered table-ata">
                            <col style={{ width: "30%" }} />
                            <col style={{ width: "30%" }} />
                            <col style={{ width: "40%" }} />
                            <thead>
                              <tr className="table-head-ata">
                                <th>CAMPO</th>
                                <th>DE</th>
                                <th>PARA</th>
                              </tr>
                            </thead>

                            <tbody>
                              {histSelecionado.changes.map((change, index) => (
                                <tr
                                  key={`${index}_${change.field}`}
                                  className="table-body-ata"
                                >
                                  <td>{ajusta_nome(change.field)}</td>
                                  <td>
                                    {(change.field === "data_assinatura") |
                                    (change.field === "data_encerramento") ? (
                                      moment(change.from, "YYYY-MM-DD HH:mm:ss")
                                        .format("DD/MM/YYYY HH:mm:ss")
                                        .split(" ")[0]
                                    ) : (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: change.from,
                                        }}
                                      />
                                    )}
                                  </td>
                                  <td>
                                    {(change.field === "data_assinatura") |
                                    (change.field === "data_encerramento") ? (
                                      moment(change.to, "YYYY-MM-DD HH:mm:ss")
                                        .format("DD/MM/YYYY HH:mm:ss")
                                        .split(" ")[0]
                                    ) : (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: change.to,
                                        }}
                                      />
                                    )}
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
                                      className="table table-bordered table-ata"
                                    >
                                      <col style={{ width: "20%" }} />
                                      <col style={{ width: "30%" }} />
                                      <col style={{ width: "50%" }} />
                                      <thead>
                                        <tr className="table-head-ata"></tr>
                                      </thead>
                                      <tbody>
                                        <tr className="table-head-ata">
                                          <th colSpan="3">DE</th>
                                        </tr>
                                        {grupo.itens_obrigacao.from.map(
                                          (situacao, i) => (
                                            <>
                                              <tr
                                                key={`${i}_${situacao.item}_from`}
                                                className="table-body-ata"
                                              >
                                                <td>{grupo.nome.from}</td>
                                                <td>{situacao.item}</td>
                                                <td>
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        situacao.descricao,
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
                                      className="table table-bordered table-ata"
                                    >
                                      <col style={{ width: "20%" }} />
                                      <col style={{ width: "30%" }} />
                                      <col style={{ width: "50%" }} />
                                      <thead>
                                        <tr className="table-head-ata"></tr>
                                      </thead>
                                      <tbody>
                                        <tr className="table-head-ata">
                                          <th colSpan="3">PARA</th>
                                        </tr>
                                        {grupo.itens_obrigacao.to.map(
                                          (situacao, i) => (
                                            <>
                                              <tr
                                                key={`${i}_${situacao.item}_to`}
                                                className="table-body-ata"
                                              >
                                                <td>{grupo.nome.to}</td>
                                                <td>{situacao.item}</td>
                                                <td>
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        situacao.descricao,
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
                          <Row className="row-hist">
                            <Col className="campo-ata col-12 mt-2 mb-2">
                              <b>Criação de Ata</b>
                            </Col>
                            <Col className="campo-ata col-12 mt-2">
                              <b>Ata nº:</b> {valor_field("numero")}
                            </Col>
                            <Col className="campo-ata col-6">
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

                            <Col className="col-5 mt-1">
                              {" "}
                              <b>Status:</b> {valor_field("status")}
                            </Col>

                            <Col className="campo-ata col-12">
                              {" "}
                              <b>Número do Edital:</b> {valor_field("edital")}
                            </Col>

                            <Col className="campo-ata col-6">
                              <b>Data de Assinatura: </b>
                              {
                                moment(
                                  valor_field("data_assinatura"),
                                  "YYYY-MM-DD HH:mm:ss",
                                )
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[0]
                              }
                            </Col>
                            <Col className="col-5 mt-1">
                              {" "}
                              <b>Vigência:</b> {valor_field("vigencia")}{" "}
                              {valor_field("unidade_vigencia")}
                            </Col>
                            <Col className="campo-ata col-6">
                              <b>Data de Encerramento: </b>
                              {
                                moment(
                                  valor_field("data_encerramento"),
                                  "YYYY-MM-DD HH:mm:ss",
                                )
                                  .format("DD/MM/YYYY HH:mm:ss")
                                  .split(" ")[0]
                              }
                            </Col>
                            <Col className="campo-ata col-12 mt-4">
                              <b>Empresa:</b> {valor_field("empresa")}
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
      </Container>
    </Modal>
  );
}
