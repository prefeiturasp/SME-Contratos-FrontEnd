import React, { Component } from "react";
import Page from "../../components/Global/Page";
import CardSection from "../../components/Contratos/CardSection";
import IconeEquipamento from "../../assets/images/icon-equipamento.svg";
import IconeServico from "../../assets/images/icon-servicos.svg";
import CardEquipamento from "../../components/Contratos/CardEquipamento";
import CardServico from "../../components/Contratos/CardServico";
import { Button, ButtonGroup } from "reactstrap";
import { Messages } from "primereact/messages";
import { redirect } from "../../utils/redirect";
import {getMinhasNotificacoesVigenciaContratos, geraNotificacoesVigenciaContratos} from "../../service/Notificacoes.service"

class PainelSelecao extends Component {

  constructor(props) {
    super(props)
    this.state = {
      qtdContratosVencendo: 0
    }
    
  }
  
  
  async componentDidMount() {
    // TODO Extrair a geração de notificações para um serviço assíncrono do Celery
    geraNotificacoesVigenciaContratos().then(
      async () => {
        const minhasNotificacoesVigenciaContrato = await getMinhasNotificacoesVigenciaContratos()

        if (minhasNotificacoesVigenciaContrato) {
          this.setState({qtdContratosVencendo: minhasNotificacoesVigenciaContrato.contratos_vencendo})
        }
        
        
        this.exibeNotificacoesVigencia()
      }
    )

    
  }

  exibeNotificacoesVigencia() {
    if (this.state.qtdContratosVencendo) {
      const strContratos = this.state.qtdContratosVencendo > 1 ? 'contratos' : 'contrato'
      const strProximos = this.state.qtdContratosVencendo > 1 ? 'próximos' : 'próximo'
      this.messages.show({
        severity: "warn",
        sticky: true,
        detail:
          `${this.state.qtdContratosVencendo} ${strContratos} ${strProximos} ao vencimento.`
      });
    }
  }
  
  render() {
    return (
      <div>
        <Page >
        <Messages ref={el => (this.messages = el)}></Messages>
        <h4>Escolha visualização de painel de contratos</h4>
        
          <ButtonGroup className="mb-4">
            <Button className="btn-coad-background" size="sm"><i className="pi pi-table mx-4"></i></Button>
            <Button onClick={()=> redirect('#/contratos-continuos')} className="btn-coad-background-outline" size="sm" outline><i className="pi pi-list mx-4"></i></Button>
          </ButtonGroup>

          <CardSection icone={IconeEquipamento} titulo="Escolha Equipamento">
            <CardEquipamento />
          </CardSection>
          
          <CardSection icone={IconeServico} titulo="Escolha Categoria de Serviço">
            <CardServico />
          </CardSection>
        </Page>
      </div>
    );
  }
}

export default PainelSelecao;
