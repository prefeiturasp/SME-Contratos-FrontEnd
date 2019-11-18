import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { CoadTabs } from "../../components/Contratos/CoadTabs";
import CONFIG from "../../configs/config.constants";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import "./style.scss";
import { getUrlParams } from "../../utils/params";
import { getDocumentosFiscaisByContrato } from "../../service/DocumentosContrato.service";

// https://github.com/fortana-co/react-dropzone-uploader
class Anexos extends Component {
  state = {
    url: `${CONFIG.API_URL}/documentos-fiscais/`,
    docsDres: [],
    docsUnidades: [],
    docsOutros: [],
    uuidContrato: null
  };

  carregaAnexosContrato = async () => {
    const { docsDres, docsUnidades, docsOutros } = this.state;
    const param = getUrlParams();
    this.setState({ uuidContrato: param.uuid });
    const docs = await getDocumentosFiscaisByContrato(param.uuid);
    docs.filter(value => {
      if (value.tipo_unidade === "FISCAL_DRE") {
        const fileName = value.anexo.split("/").slice(-1)[0];
        docsDres.push({ href: value.anexo, name: fileName });
        this.setState({ docsDres });
      }
      if (value.tipo_unidade === "FISCAL_UNIDADE") {
        const fileName = value.anexo.split("/").slice(-1)[0];
        docsUnidades.push({ href: value.anexo, name: fileName });
        this.setState({ docsUnidades });
      }
      if (value.tipo_unidade === "FISCAL_OUTROS") {
        const fileName = value.anexo.split("/").slice(-1)[0];
        docsOutros.push({ href: value.anexo, name: fileName });
        this.setState({ docsOutros });
      }
    });
  };

  getUploadParamsDre = ({ file, meta }) => {
    const { uuidContrato, url } = this.state;
    const fields = {
      anexo: file,
      contrato: uuidContrato,
      tipo_unidade: "FISCAL_DRE"
    };
    return { fields, url: url };
  };

  getUploadParamsUnidade = ({ file, meta }) => {
    const { uuidContrato, url } = this.state;
    const fields = {
      anexo: file,
      contrato: uuidContrato,
      tipo_unidade: "FISCAL_UNIDADE"
    };
    return { fields, url: url };
  };

  getUploadParamsOutros = ({ file, meta }) => {
    const { uuidContrato, url } = this.state;
    const fields = {
      anexo: file,
      contrato: uuidContrato,
      tipo_unidade: "FISCAL_OUTROS"
    };
    return { fields, url: url };
  };

  componentDidMount() {
    this.carregaAnexosContrato();
  }

  render() {
    const { disabilitado } = this.props;
    const { docsDres, docsUnidades, docsOutros } = this.state;
    return (
      <div className="coad-anexos">
        <CoadTabs
          titulo1={"Carregar documentos de Fiscais"}
          titulo2={"Carregar outros documentos"}
          conteudo1={
            <div>
              <Row>
                <Col className="pb-5">
                  <label className="font-weight-bold">
                    Anexar documentos Fiscal DRE
                  </label>
                  <Dropzone
                    getUploadParams={this.getUploadParamsDre}
                    // onChangeStatus={handleChangeStatus}
                    inputContent="Clique ou arraste arquivos nesta área para upload"
                    inputWithFilesContent="Adicionar mais arquivos"
                    disabled={disabilitado}
                  />
                  <Row className="mt-2">
                    {docsDres
                      ? docsDres.map((file, i) => {
                          return (
                            <Col xl={12} lg={12}>
                              <a
                                className="text-danger"
                                href={file.href}
                                target="_blank"
                                rel="Documentos fiscais DRE"
                              >
                                <i className="fas fa-xl fa-paperclip"></i>{" "}
                                {file.name}
                              </a>
                            </Col>
                          );
                        })
                      : ""}
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col className="pb-5">
                  <label className="font-weight-bold">
                    Anexar documentos Fiscal Unidade
                  </label>
                  <Dropzone
                    getUploadParams={this.getUploadParamsUnidade}
                    // onChangeStatus={handleChangeStatus}
                    inputContent="Clique ou arraste arquivos nesta área para upload"
                    inputWithFilesContent="Adicionar mais arquivos"
                    disabled={disabilitado}
                  />
                  <Row className="mt-2">
                    {docsUnidades
                      ? docsUnidades.map((file, i) => {
                          return (
                            <Col xl={12} lg={12}>
                              <a
                                className="text-danger"
                                href={file.href}
                                target="_blank"
                                rel="Documentos fiscais Unidade"
                              >
                                <i className="fas fa-xl fa-paperclip"></i>{" "}
                                {file.name}
                              </a>
                            </Col>
                          );
                        })
                      : ""}
                  </Row>
                </Col>
              </Row>
            </div>
          }
          conteudo2={
            <Row>
              <Col className="pb-5">
                <label className="font-weight-bold">
                  Anexar outros documentos
                </label>
                <Dropzone
                  getUploadParams={this.getUploadParamsOutros}
                  // onChangeStatus={handleChangeStatus}
                  inputContent="Clique ou arraste arquivos nesta área para upload"
                  inputWithFilesContent="Adicionar mais arquivos"
                  disabled={disabilitado}
                />
                <Row className="mt-2">
                    {docsOutros
                      ? docsOutros.map((file, i) => {
                          return (
                            <Col xl={12} lg={12}>
                              <a
                                className="text-danger"
                                href={file.href}
                                target="_blank"
                                rel="Documentos fiscais Outros"
                              >
                                <i className="fas fa-xl fa-paperclip"></i>{" "}
                                {file.name}
                              </a>
                            </Col>
                          );
                        })
                      : ""}
                  </Row>
              </Col>
            </Row>
          }
        />
      </div>
    );
  }
}

export default Anexos;
