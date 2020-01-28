import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Row, Col } from "reactstrap";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import {
  getObrigacaoContratualByContrato,
  addObrigacaoContratual,
  updateObrigacaoContratual,
  excluirObrigacaoContratual
} from "../../../service/ObrigacoesContratuais.service";
import { Dialog } from "primereact/dialog";
import { getUrlParams } from "../../../utils/params";

export default class ListarObrigacoesContratuais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obrigacoesSelect: [],
      obrigacoes: [
        {
          contrato: "",
          item: "",
          obrigacao: ""
        }
      ],
      uuid: null,
      contrato: null,
      item: "",
      obrigacao: "",
      tituloModal: "",
      descricaoModal: "",
      modalVisible: false,
      opereracao: "",
      adicionarVisible: false,
      editarVisible: false,
      confirmarVisible: false,
      excluirVisible: false
    };
    this.obrigacaoTemplate = this.obrigacaoTemplate.bind(this);
  }

  handleAdicionarObrigacao = async () => {
    const payload = {
      contrato: this.state.contrato,
      item: this.state.item,
      obrigacao: this.state.obrigacao
    };
    const resultado = await addObrigacaoContratual(payload);
    if (resultado.uuid) {
      this.setState({
        obrigacoesSelect: await getObrigacaoContratualByContrato(
          this.state.contrato
        )
      });
      this.setState({
        adicionarVisible: false,
        item: "",
        obrigacao: ""
      });
    }
  };

  onClickEditar(value) {
    this.setState({
      tituloModal: "Editar Obrigações Contratuais",
      descricaoModal: ""
    });
    this.state.obrigacoesSelect.forEach(obrigacao => {
      if (obrigacao.uuid === value) {
        this.setState({
          uuid: obrigacao.uuid,
          contrato: obrigacao.contrato,
          item: obrigacao.item,
          obrigacao: obrigacao.obrigacao
        });
      }
    });
    this.setState({ adicionarVisible: true, opereracao: "edicao" });
  }

  async handleClickConfirmar() {
    const payload = {
      contrato: this.state.contrato,
      item: this.state.item,
      obrigacao: this.state.obrigacao ? this.state.obrigacao : null
    };
    const result = await updateObrigacaoContratual(payload, this.state.uuid);
    if (result) {
      this.setState({
        obrigacoesSelect: await getObrigacaoContratualByContrato(
          this.state.contrato
        )
      });
      this.setState({ confirmarVisible: false });
    }
  }

  handleExcluirObrigacao = async () => {
    const resultado = await excluirObrigacaoContratual(this.state.uuid);
    if (resultado) {
      this.setState({
        obrigacoesSelect: await getObrigacaoContratualByContrato(
          this.state.contrato
        )
      });
    }
    this.setState({ excluirVisible: false });
  };

  obrigacaoTemplate(rowData, column) {
    return <div dangerouslySetInnerHTML={{ __html: rowData.obrigacao }} />;
  }

  actionTemplate(rowData, column) {
    return (
      <div>
        <Button
          type="button"
          label="Editar"
          className="btn-coad-background-outline"
          onClick={event => {
            this.onClickEditar(column.uuid);
          }}
        />
      </div>
    );
  }

  renderHeader() {
    return (
      <div>
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="bullet"></button>
          <button className="ql-list" value="ordered"></button>
        </span>
      </div>
    );
  }

  async componentDidMount() {
    const uuid_contrato = getUrlParams();
    this.setState({ contrato: uuid_contrato.uuid });
    this.setState({
      obrigacoesSelect: await getObrigacaoContratualByContrato(
        uuid_contrato.uuid
      )
    });
  }

  render() {
    let footerSemObrigacoes =
      "Não existem obrigações contratuais adicionadas no contrato";

    let cols = [
      { field: "item", header: "Item", width: "20%" },
      { field: "obrigacao", header: "Obrigações" },
      { field: "editar", header: "" }
    ];

    let dynamicColumns = cols.map((col, i) => {
      switch (col.field) {
        case "item":
          return (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              style={{ width: "10%" }}
            />
          );
        case "editar":
          return (
            <Column
              body={this.actionTemplate.bind(this, col)}
              style={{ textAlign: "center", width: "8em" }}
            />
          );

        default:
          return (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              body={this.obrigacaoTemplate}
            />
          );
      }
    });
    const footerModalConfirmar = (
      <div>
        <Button
          type="button"
          label="Sim"
          style={{ marginRight: ".25em" }}
          onClick={this.handleClickConfirmar.bind(this)}
          className="btn-coad-background-outline"
        />
        <Button
          type="button"
          label="Não"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            this.setState({ confirmarVisible: false, item: "", obrigacao: "" });
          }}
        />
      </div>
    );

    const footerModalAdicionar = (
      <div>
        <Button
          type="button"
          label="Cancelar"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            this.setState({ adicionarVisible: false, item: "", obrigacao: "" });
          }}
          className="btn-coad-background-outline"
        />
        <Button
          type="button"
          label="Adicionar"
          style={{ marginRight: ".25em" }}
          onClick={this.handleAdicionarObrigacao.bind(this)}
        />
      </div>
    );

    const footerModalEditar = (
      <div>
        <Button
          type="button"
          label="Excluir"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            this.setState({ adicionarVisible: false, excluirVisible: true });
          }}
          className="btn-coad-background-outline"
        />
        <Button
          type="button"
          label="editar"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            this.setState({ adicionarVisible: false, confirmarVisible: true });
          }}
          className="btn-coad-background-outline"
        />
        <Button
          type="button"
          label="cancelar"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            this.setState({ adicionarVisible: false, item: "", obrigacao: "" });
          }}
        />
      </div>
    );

    const footerModalExcluir = (
      <div>
        <Button
          type="button"
          label="Sim"
          style={{ marginRight: ".25em" }}
          onClick={this.handleExcluirObrigacao.bind(this)}
          className="btn-coad-background-outline"
        />
        <Button
          type="button"
          label="Não"
          style={{ marginRight: ".25em" }}
          onClick={() => {
            this.setState({ excluirVisible: false });
          }}
        />
      </div>
    );

    let footer = null;
    if (this.state.opereracao === "inclusao") {
      footer = footerModalAdicionar;
    } else {
      footer = footerModalEditar;
    }

    const {
      obrigacoesSelect,
      tituloModal,
      descricaoModal,
      adicionarVisible,
      confirmarVisible,
      excluirVisible
    } = this.state;
    const rowsPerPage = 5;
    const header = this.renderHeader();

    return (
      <div>
        <Row>
          <Col lg={6} xl={6}>
            <h6 style={{ fontWeight: "bold" }}>
              Obrigações Contratuais já adicionadas
            </h6>
          </Col>
          <Col lg={6} xl={6}>
            <span className="float-right">
              <Button
                disabled={this.props.desabilitado}
                icon="pi pi-file"
                type="button"
                label="Adicionar Obrigação"
                style={{ marginBottom: ".80em" }}
                onClick={e => {
                  this.setState({
                    tituloModal: "Adicionar Obrigações Contratuais",
                    descricaoModal:
                      "Adicione Item e obrigações em seus respectivos campos. Caso queira adicionar sub-item (Ex: 01.1), insira no campo “Obrigações Contratuais” do item principal.",
                    adicionarVisible: true,
                    opereracao: "inclusao",
                    item: "",
                    obrigacao: ""
                  });
                }}
                className="btn-coad-background-outline"
              />
            </span>
          </Col>
        </Row>
        {obrigacoesSelect.length > 0 ? (
          <DataTable
            value={obrigacoesSelect}
            resizableColumns={true}
            columnResizeMode="fit"
            paginator={obrigacoesSelect.length > rowsPerPage}
            rows={rowsPerPage}
            paginatorTemplate="PrevPageLink PageLinks NextPageLink"
            className="datatable-strapd-coad"
          >
            {dynamicColumns}
          </DataTable>
        ) : (
          <div>
            <DataTable
              footer={footerSemObrigacoes}
              className="datatable-footer-coad "
            >
              <Column header="Item" style={{ width: "10%" }} />
              <Column header="Obrigações" />
              <Column header="" style={{ width: "8em" }} />
            </DataTable>
          </div>
        )}

        <Dialog
          header={tituloModal}
          visible={adicionarVisible}
          style={{ width: "60vw" }}
          footer={footer}
          onHide={() => {
            this.setState({ adicionarVisible: false });
          }}
        >
          {descricaoModal}
          <br />
          <Row>
            <Col lg={4} xl={4}>
              <label for="item">Item</label>
              <br />
              <InputText
                value={this.state.item}
                onChange={e =>
                  this.setState({
                    item: e.target.value
                  })
                }
                placeholder="Digitar item"
                className="w-100"
              />
            </Col>
            <Col lg={8} xl={8} className="p-fluid">
              <label for="obrigacao">Obrigações Contratuais</label>
              <br />
              <Editor
                headerTemplate={header}
                style={{ height: "120px" }}
                value={this.state.obrigacao}
                onTextChange={e => this.setState({ obrigacao: e.htmlValue })}
                className="editor-coad"
              />
            </Col>
          </Row>
        </Dialog>
        <Dialog
          header="Confirmar edição de Obrigação Contratual"
          visible={confirmarVisible}
          style={{ width: "60vw" }}
          footer={footerModalConfirmar}
          onHide={() => {
            this.setState({ confirmarVisible: false });
          }}
        >
          <div>
            <p>Deseja confirmar edição de obrigação contratual?</p>
          </div>
        </Dialog>
        <Dialog
          header="Excluir Obrigação Contratual"
          visible={excluirVisible}
          style={{ width: "60vw" }}
          footer={footerModalExcluir}
          onHide={() => {
            this.setState({ excluirVisible: false });
          }}
        >
          <div>
            <p>Deseja excluir obrigação contratual?</p>
          </div>
        </Dialog>
      </div>
    );
  }
}
