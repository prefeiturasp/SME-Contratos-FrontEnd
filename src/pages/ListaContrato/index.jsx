import React, { Component } from "react";
import { TableContrato } from "../../components/TableContrato";
import { getMeusContratos, getContratos } from "../../service/Contratos.service";
import { Button } from "primereact/button";
import Page from "../../components/Page";
import Container from "../../components/Container";

export class ListaContrato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contratos: []
    };
  }

  setaTodosContratos() {
    getContratos().then(contratos => {
      this.setState({ contratos });
    });
  }

  setaMeusContratos() {
    getMeusContratos().then(contratos => {
      this.setState({ contratos });
    });
  }

  componentDidMount() {
    this.setaMeusContratos();
  }

  render() {
    const { contratos } = this.state;
    return (
      <Page>
        <Container>
          <h1>Lista de Contratos</h1>
          <div style={{ paddingBottom: "10px" }}>
            <Button
              label="Meus Contratos"
              style={{ marginRight: "10px" }}
              onClick={this.setaMeusContratos.bind(this)}
            />
            <Button
              label="Todos Contratos"
              onClick={this.setaTodosContratos.bind(this)}
            />
          </div>
          <TableContrato contratos={contratos} />
        </Container>
      </Page>
    );
  }
}
export default ListaContrato;
