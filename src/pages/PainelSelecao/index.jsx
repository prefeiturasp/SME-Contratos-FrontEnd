import React, { Component } from "react";

import Page from "../../components/Global/Page";
import CardLogo from "../../components/Contratos/CardLogo";
import { Button, ButtonGroup, Row } from "reactstrap";
import { Messages } from "primereact/messages";
import { redirect } from "../../utils/redirect";
import { getMinhasNotificacoesVigenciaContratos } from "../../service/Notificacoes.service";
import iconeContratos from "../../../src/assets/images/icon-contratos.svg";
import IconeOrcamento from "../../../src/assets/images/icon-orcamento.svg";

class PainelSelecao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtdContratosVencendo: 0,
    };
  }

  async componentDidMount() {
    const minhasNotificacoesVigenciaContrato =
      await getMinhasNotificacoesVigenciaContratos();

    if (minhasNotificacoesVigenciaContrato) {
      this.setState({
        qtdContratosVencendo:
          minhasNotificacoesVigenciaContrato.contratos_vencendo,
      });
    }

    this.exibeNotificacoesVigencia();
  }

  exibeNotificacoesVigencia() {
    if (this.state.qtdContratosVencendo) {
      const strContratos =
        this.state.qtdContratosVencendo > 1 ? "contratos" : "contrato";
      const strProximos =
        this.state.qtdContratosVencendo > 1 ? "próximos" : "próximo";
      this.messages.show({
        severity: "warn",
        sticky: true,
        detail: `${this.state.qtdContratosVencendo} ${strContratos} ${strProximos} ao vencimento.`,
      });
    }
  }

  render() {
    return (
      <div>
        <Page>
          <Messages ref={el => (this.messages = el)}></Messages>
          <h4>Escolha visualização de painel de contratos</h4>

          <ButtonGroup className="mb-4">
            <Button className="btn-coad-background" size="sm">
              <i className="pi pi-table mx-4"></i>
            </Button>
            <Button
              onClick={() => redirect("#/contratos-continuos")}
              className="btn-coad-background-outline"
              size="sm"
              outline
            >
              <i className="pi pi-list mx-4"></i>
            </Button>
          </ButtonGroup>
          <Row>
            <CardLogo
              titulo="Contratos"
              iconeLogo={iconeContratos}
              rota="#/gestao-contratos"
            />
            <CardLogo
              titulo="Orçamentos"
              iconeLogo={IconeOrcamento}
              rota="#/orcamento"
            />
          </Row>
        </Page>
      </div>
    );
  }
}

export default PainelSelecao;
