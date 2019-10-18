import React, { Component } from "react";
import Page from "../../components/Page";
import Container from "../../components/Container";
import { BuscaContratosForm } from '../../components/Coad/BuscaContratosForm'
import { getContratos } from '../../service/Contratos.service'

export default class Home extends Component {
  constructor(props) {
    super(props)
  
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
    }
  }
  

  async onBuscarClick(filtros) {
    this.setState({filtros})

    const contratos = await getContratos(filtros)
    this.setState({contratos})

  }

  render() {
    return (
      <Page>
        <Container>
          <h1>Welcome to COAD</h1>
          <p>
              Ut tincidunt tincidunt erat. Fusce vulputate eleifend sapien. Curabitur nisi. 
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, 
              sit amet adipiscing sem neque sed ipsum. Vivamus laoreet.
              Ut tincidunt tincidunt erat. Fusce vulputate eleifend sapien. Curabitur nisi. 
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, 
              sit amet adipiscing sem neque sed ipsum. Vivamus laoreet.
              Ut tincidunt tincidunt erat. Fusce vulputate eleifend sapien. Curabitur nisi. 
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, 
              sit amet adipiscing sem neque sed ipsum. Vivamus laoreet.
         </p>
        </Container>
        <BuscaContratosForm onBuscarClick={filtros => this.onBuscarClick(filtros)}  />
        <p>
            Empresa: {this.state.filtros.empresa}
            Gestor: {this.state.filtros.gestor}
            Encerramento: {this.state.filtros.encerramentoDataInicial} a {this.state.filtros.encerramentoDataFinal}
            Equipamento: {this.state.filtros.equipamento}
            Estado: {this.state.filtros.estado}
            Situacao: {this.state.filtros.situacao}
            TermoContrato: {this.state.filtros.termoContrato}

        </p>
        
      </Page>
    );
  }
}
