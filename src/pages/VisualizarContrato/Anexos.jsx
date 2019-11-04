import React from "react";
import { Row, Col } from "reactstrap";
import { Upload } from "antd";
import { CoadTabs } from "../../components/Contratos/CoadTabs";

const Anexos = props => {
  const onUpload = e => {
    props.setDocumentosDre(e.target.files)
  };

  const { Dragger } = Upload;
  const { disabilitado } = props;
  return (
    <CoadTabs
      titulo1={"Carregar documentos de Fiscais"}
      titulo2={"Carregar outros documentos"}
      conteudo1={
        <div>
          <Row>
            <Col className="pb-3">
              <label className="font-weight-bold">
                Anexar documentos Fiscal DRE
              </label>
              <Dragger disabled={disabilitado}>
                <p className="ant-upload-drag-icon">
                  <i className="fas fa-file-upload coad-color"></i>
                </p>
                <p className="ant-upload-text">
                  Clique ou arraste arquivos nesta área para upload
                </p>
                <p className="ant-upload-hint">
                  Suporte para arquivos .jpeg, .png, .pdf e .docx.
                </p>
              </Dragger>
            </Col>
          </Row>
          <Row>
            <Col className="pb-3 mt-5">
              <label className="font-weight-bold">
                Anexar documentos Fiscal Unidades
              </label>
              <Dragger disabled={disabilitado}>
                <p className="ant-upload-drag-icon">
                  <i className="fas fa-file-upload coad-color"></i>
                </p>
                <p className="ant-upload-text">
                  Clique ou arraste arquivos nesta área para upload
                </p>
                <p className="ant-upload-hint">
                  Suporte para arquivos .jpeg, .png, .pdf e .docx.
                </p>
              </Dragger>
            </Col>
          </Row>
        </div>
      }
      conteudo2={
        <div>
          <Row>
            <Col className="pb-3">
              <label className="font-weight-bold">Anexar documentos</label>
              <Dragger disabled={disabilitado}>
                <p className="ant-upload-drag-icon">
                  <i className="fas fa-file-upload coad-color"></i>
                </p>
                <p className="ant-upload-text">
                  Clique ou arraste arquivos nesta área para upload
                </p>
                <p className="ant-upload-hint">
                  Suporte para arquivos .jpeg, .png, .pdf e .docx.
                </p>
              </Dragger>
            </Col>
          </Row>
        </div>
      }
    />
  );
};

export default Anexos;

// import { Upload, Icon, message } from "antd";

// const { Dragger } = Upload;

// const props = {
//   name: "file",
//   multiple: true,
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   }
// };
