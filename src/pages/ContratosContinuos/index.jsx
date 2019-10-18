import React, { Component } from "react";
import Page from "../../components/Page";
import Container from "../../components/Container";
import { TabView, TabPanel } from "primereact/tabview";
import { Accordion, AccordionTab } from "primereact/accordion";
import { TableContrato } from "../../components/TableContrato";
import {
  getMeusContratos,
  getContratos
} from "../../service/Contratos.service";
import "./style.scss";
import { formatadorDeData } from "../../utils/formatador";
import { BuscaContratosForm } from "../../components/Coad/BuscaContratosForm";

class ContratosContinuos extends Component {
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
      const response = this.adicionarDataFormatada(contratos);
      this.setState({ contratos: response });
    });
  }

  adicionarDataFormatada = response => {
    return response.map(contrato => ({
      ...contrato,
      dataFormatada: formatadorDeData(contrato.data_encerramento)
    }));
  };

  componentDidMount() {
    this.setaMeusContratos();
  }
  // className="coad-tab-panel-contratos-continuos"

  render() {
    const { contratos } = this.state;
    return (
      <Page titulo="Nome Serviço">
        <Container icone="pi pi-chart-bar" subtitulo="Vizualizar Contratos">
          <Accordion>
            <AccordionTab
              contentClassName="coad-accordion-contratos-continuo"
              header="Personalizar filtro de busca"
            >
              <TabView className="coad-tab-panel-contratos-continuos">
                <TabPanel header="Personalizar Filtros">
                  <BuscaContratosForm
                    onBuscarClick={filtros => this.onBuscarClick(filtros)}
                  />
                </TabPanel>
                <TabPanel disabled header="Personalizar Colunas">
                  Content II
                </TabPanel>
              </TabView>
            </AccordionTab>
          </Accordion>
          <TableContrato contratos={contratos} />
        </Container>
      </Page>
    );
  }
}

export default ContratosContinuos;
