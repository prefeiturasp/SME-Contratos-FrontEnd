import React from "react";
import { Row, Col } from "reactstrap";
import { CoadTabs } from "../../components/Contratos/CoadTabs";
import CONFIG from "../../configs/config.constants";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import "./style.scss";

// https://github.com/fortana-co/react-dropzone-uploader
const Anexos = props => {
  const uuidContrato = props.contrato.uuid;
  const url = `${CONFIG.API_URL}/documentos-fiscais/`;

  const getUploadParamsDre = ({ file, meta }) => {
    const fields = {
      anexo: file,
      contrato: uuidContrato,
      tipo_unidade: "FISCAL_DRE"
    };
    return { fields, url: url };
  };

  const getUploadParamsUnidade = ({ file, meta }) => {
    const fields = {
      anexo: file,
      contrato: uuidContrato,
      tipo_unidade: "FISCAL_UNIDADE"
    };
    return { fields, url: url };
  };

  const getUploadParamsOutros = ({ file, meta }) => {
    const fields = {
      anexo: file,
      contrato: uuidContrato,
      tipo_unidade: "FISCAL_OUTROS"
    };
    return { fields, url: url };
  };

  const { disabilitado } = props;
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
                  getUploadParams={getUploadParamsDre}
                  // onChangeStatus={handleChangeStatus}
                  inputContent="Clique ou arraste arquivos nesta área para upload"
                  inputWithFilesContent="Adicionar mais arquivos"
                  disabled={props.disabilitado}
                />
              </Col>
            </Row>

            <Row>
              <Col className="pb-5">
                <label className="font-weight-bold">
                  Anexar documentos Fiscal Unidade
                </label>
                <Dropzone
                  getUploadParams={getUploadParamsUnidade}
                  // onChangeStatus={handleChangeStatus}
                  inputContent="Clique ou arraste arquivos nesta área para upload"
                  inputWithFilesContent="Adicionar mais arquivos"
                  disabled={props.disabilitado}
                />
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
                getUploadParams={getUploadParamsOutros}
                // onChangeStatus={handleChangeStatus}
                inputContent="Clique ou arraste arquivos nesta área para upload"
                inputWithFilesContent="Adicionar mais arquivos"
                disabled={props.disabilitado}
              />
            </Col>
          </Row>
        }
      />
    </div>
  );
};

export default Anexos;
