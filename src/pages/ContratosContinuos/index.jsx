import React, { Component } from "react";
import Page from "../../components/Page";
import Container from "../../components/Container";
import { TabView, TabPanel } from "primereact/tabview";
import { Accordion, AccordionTab } from "primereact/accordion";
import { TableContrato } from "../../components/TableContrato";
import { getMeusContratos, getContratos } from "../../service/ContratoService.js";
import "./style.scss";

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
      this.setState({ contratos });
    });
  }

  componentDidMount() {
    this.setaMeusContratos();
  }

  render() {
    const { contratos } = this.state;
    return (
      <Page titulo="Nome Serviço">
        <Container icone="pi pi-chart-bar" subtitulo="Vizualizar Contratos">
          <TabView className="coad-tab-panel-contratos-continuos">
            <TabPanel header="Personalizar Filtros">
              <Accordion>
                <AccordionTab
                  contentClassName="coad-accordion-contratos-continuo"
                  header="Personalizar filtro de busca"
                >
                  Content I
                </AccordionTab>
              </Accordion>
            </TabPanel>
            <TabPanel disabled header="Personalizar Colunas">
              Content II
            </TabPanel>
          </TabView>
          <TableContrato contratos={contratos} />
        </Container>
      </Page>
    );
  }
}

export default ContratosContinuos;
