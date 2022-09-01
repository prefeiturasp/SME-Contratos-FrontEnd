import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import * as CONFIG from "../../configs/config.constants";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getUrlParams } from "../../utils/params";
import { getAnexosByContrato } from "../../service/DocumentosContrato.service";
import "./style.scss";
import { Toast } from "primereact/toast";

// https://github.com/fortana-co/react-dropzone-uploader
class Anexos extends Component {
  state = {
    url: `${CONFIG.API_URL}/anexos-contratos/`,
    anexos: [],
    uuidContrato: null,
  };
  toast = React.createRef();
  carregaAnexosContrato = async () => {
    const { anexos } = this.state;
    const param = getUrlParams();
    this.setState({ uuidContrato: param.uuid });
    const docs = await getAnexosByContrato(param.uuid);
    docs.forEach(value => {
      const fileName = value.anexo.split("/").slice(-1)[0];
      anexos.push({ href: value.anexo, name: fileName });
      this.setState({ anexos });
    });
  };

  getUploadParams = ({ file }) => {
    const nomeArquivo = file.name.split(".").slice()[0];

    if (nomeArquivo.length > 50) {
      this.toast.show({
        severity: "error",
        detail:
          "Nome de arquivo excede o limite de caracteres. Por favor, renomeie o arquivo",
        life: 7000,
      });
    } else {
      const { uuidContrato, url } = this.state;
      const fields = {
        anexo: file,
        contrato: uuidContrato,
      };
      return { fields, url: url };
    }
  };

  componentDidMount() {
    this.carregaAnexosContrato();
  }

  render() {
    const { disabilitado } = this.props;
    const { anexos } = this.state;
    return (
      <div className="coad-anexos">
        <Toast ref={el => (this.toast = el)}></Toast>
        <Row>
          <Col className="pb-3">
            <Row className="row-anexo">
              <div className="title-anexo">Anexar documentos</div>
              <div className="aviso-anexo">
                IMPORTANTE: anexe documentos nos formatos .pdf, .doc, .docx,
                .xls. xlsx, .png, .jpg e .jpeg.
              </div>
            </Row>
            <Dropzone
              getUploadParams={this.getUploadParams}
              onChangeStatus={this.handleChangeStatus}
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
