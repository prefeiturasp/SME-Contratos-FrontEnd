import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import "./style.scss";

// https://github.com/fortana-co/react-dropzone-uploader
export default ({ intercorrencia, setIntercorrencia }) => {
  const [anexos, setAnexos] = useState([]);

  const validarImagem = file => {
    let format = file.meta.name.split(".").pop();
    if (file.meta.name.length > 50) {
      return "Nome de arquivo excede o limite de caracteres. Por favor, renomeie o arquivo";
    }
    if (file.meta.size > 1024 * 1024 * 15) {
      return "Arquivo superior a 15MB, não é possível fazer o upload";
    }
    if (
      !["pdf", "doc", "docx", "xls", "xlsx", "png", "jpg", "jpeg"].includes(
        format,
      )
    ) {
      return "Formato de arquivo inválido";
    }
    return "Arquivo inserido com sucesso";
  };

  const handleChangeStatus = async (file, change) => {
    if (
      change === "error_validation" &&
      file.meta.validationError === "Arquivo inserido com sucesso"
    ) {
      let newFile = {
        name: file.file.name,
        href: file.meta.previewUrl,
        anexo: file.file,
      };
      let newAnexos = [...anexos, newFile];
      setAnexos(newAnexos);
      setIntercorrencia({ ...intercorrencia, anexos: newAnexos });
    }
    if (change === "removed") {
      let newAnexos = [...anexos].filter(
        x => !x.meta || x.meta.id !== file.meta.id,
      );
      setAnexos(newAnexos);
      setIntercorrencia({ ...intercorrencia, anexos: newAnexos });
    }
  };

  return (
    <div className="coad-anexos">
      <Row>
        <Col className="mt-3 pb-5">
          <Row className="row-anexo">
            <div className="title-anexo">Anexar documentos</div>
            <div className="aviso-anexo">
              IMPORTANTE: anexe documentos nos formatos .pdf, .doc, .docx, .xls.
              xlsx, .png, .jpg e .jpeg.
            </div>
          </Row>
          <Dropzone
            onChangeStatus={handleChangeStatus}
            validate={validarImagem}
            inputContent="Clique ou arraste arquivos nesta área para upload"
            inputWithFilesContent="Adicionar mais arquivos"
            autoUpload={false}
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
};
