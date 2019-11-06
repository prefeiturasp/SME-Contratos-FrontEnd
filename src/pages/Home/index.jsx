import React, { Component } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { getContratos } from "../../service/Contratos.service";
import { validarPrimeiroAcesso } from "../../service/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contratos: [],
      filtros: {
        gestor: "",
        empresa_contratada: "",
        encerramento_de: "",
        encerramento_ate: "",
        equipamento: "",
        estado_contrato: "",
        situacao: "",
        termo_Contrato: "",
        tipo_servico: ""
      }
    };
  }

  async onBuscarClick(filtros) {
    this.setState({ filtros });

    const contratos = await getContratos(filtros);
    this.setState({ contratos });
  }

  
  componentDidMount() {
    validarPrimeiroAcesso();
  }
  

  render() {
    return (
      <Page titulo="Painel Princpal">
        <Container subtitulo="Painel Principal" icone="pi pi-chart-bar">
          <hr />
          <p>Aqui será o painel principal do sistema.</p>
          <br />
        </Container>
      </Page>
    );
  }
}
