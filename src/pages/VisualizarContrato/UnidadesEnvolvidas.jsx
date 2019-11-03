import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { DataTable, Column } from "primereact/datatable";

class UnidadeEnvolvidas extends Component {
  state = {
    modal: false,
    unidades: [
      {
        codigo_eol: "",
        tipo_unidade: "",
        equipamento: "",
        dre: "",
        lote: ""
      }
    ]
  };

  componentDidUpdate(nextProps, nextState) {
    if (nextProps.unidadesContrato !== this.props.unidadesContrato) {
      this.setState({ unidades: this.props.unidadesContrato });
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { unidades, modal } = this.state;
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle} className="mt-5">
          <ModalHeader toggle={this.toggle}>
            Adicionar unidade ao Contrato
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Termo de Contrato</Label>
                  <Input disabled={true} value={unidades[0].termo_contrato} />
                </FormGroup>
              </Col>
              <Col lg={8} xl={8}>
                <FormGroup>
                  <Label>Unidade</Label>
                  <Input placeholder="informe a unidade" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Valor Mensal</Label>
                  <Input placeholder="Valor Mensal" />
                </FormGroup>
              </Col>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Valor Total</Label>
                  <Input placeholder="Valor Total" />
                </FormGroup>
              </Col>
              <Col lg={4} xl={4}>
                <FormGroup>
                  <Label>Dotação</Label>
                  <Input placeholder="Dotação" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={6} xl={6}>
                <FormGroup>
                  <Label>Lote</Label>
                  <Input placeholder="Lote" />
                </FormGroup>
              </Col>
              <Col lg={6} xl={6}>
                <FormGroup>
                  <Label>DRE</Label>
                  <Input placeholder="DRE" />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn-coad-background-outline"
              onClick={this.toggle}
            >
              Cancelar
            </Button>
            <Button className="btn-coad-primary" onClick={this.toggle}>
              Adicionar Unidade
            </Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col lg={12} xl={12}>
            <DataTable value={unidades}>
              <Column field="codigo_eol" header="Código EOL" />
              <Column field="tipo_unidade" header="Un. que Recebem Serviço" />
              <Column field="equipamento" header="Equip." />
              <Column field="dre" header="DRE Corresp." />
              <Column field="lote" header="Lote Corresp." />
            </DataTable>
          </Col>
          <Col className="mt-5">
            <Button onClick={this.toggle} className="btn-coad-primary">
              <i className="fas fa-plus"></i> Adicionar Unidade
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UnidadeEnvolvidas;
