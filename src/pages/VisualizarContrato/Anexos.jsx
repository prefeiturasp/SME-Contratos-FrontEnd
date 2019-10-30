import React from "react";
import { Row, Col } from "reactstrap";
import { Upload } from "antd";

const Anexos = props => {
  const { Dragger } = Upload;
  return (
    <Row>
      <Col>
        <Dragger {...props}>
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
