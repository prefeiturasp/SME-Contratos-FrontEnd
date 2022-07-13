import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import * as CONFIG from "../../configs/config.constants";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getUrlParams } from "../../utils/params";
import { getDocumentosFiscaisByContrato } from "../../service/DocumentosContrato.service";
import "./style.scss";

// https://github.com/fortana-co/react-dropzone-uploader
class Anexos extends Component {
  state = {
    url: `${CONFIG.API_URL}/documentos-fiscais/`,
    anexos: [],
    uuidContrato: null,
  };

  carregaAnexosContrato = async () => {
    const { anexos } = this.state;
    const param = getUrlParams();
    this.setState({ uuidContrato: param.uuid });
    const docs = await getDocumentosFiscaisByContrato(param.uuid);
    docs.forEach(value => {
      const fileName = value.anexo.split("/").slice(-1)[0];
      anexos.push({ href: value.anexo, name: fileName });
      this.setState({ anexos });
    });
  };

  getUploadParams = ({ file }) => {
    const { uuidContrato, url } = this.state;
    const fields = {
      anexo: file,
      contrato: uuidContrato,
      tipo_unidade: "FISCAL_DRE", //RETIRAR
    };
    return { fields, url: url };
  };

  componentDidMount() {
    this.carregaAnexosContrato();
  }

  render() {
    const { disabilitado } = this.props;
    const { anexos } = this.state;
    return (
      <div className="coad-anexos">
        <Row>
          <Col className="pb-5">
            <Row className="row-anexo">
              <div className="title-anexo">Anexar documentos</div>
              <div className="aviso-anexo">
                IMPORTANTE: anexe documentos nos formatos .pdf, .doc, .docx,
                .xls. xlsx, .png, .jpg e .jpeg.
              </div>
            </Row>
            <Dropzone
              getUploadParams={this.getUploadParams}
              // onChangeStatus={handleChangeStatus}
              inputContent="Clique ou arraste arquivos nesta área para upload"
              inputWithFilesContent="Adicionar mais arquivos"
              maxSizeBytes={1024 * 1024 * 15}
              disabled={disabilitado}
            />

            <Row className="mt-2">
              {anexos
                ? anexos.map((file, i) => {
                    return (
                      <Col xl={12} lg={12} key={i}>
                        <a
                          className="text-danger"
                          href={file.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={i}
                        >
                          <i className="fas fa-xl fa-paperclip"></i> {file.name}
                        </a>
                      </Col>
                    );
                  })
                : ""}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Anexos;
