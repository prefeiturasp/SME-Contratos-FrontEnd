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
import { getUsuario } from "../../service/auth.service";

class ContratosContinuos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contratos: [],
      filtros: {
        gestor: getUsuario().user_id,
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


  setaMeusContratos() {
    const { filtros } = this.state;
    getContratos(filtros).then(contratos => {
      const response = this.adicionarDataFormatada(contratos)
      this.setState({ contratos: response });
    });
  }

  adicionarDataFormatada = response => {
    return response.map(contrato => ({
      ...contrato,
      dataFormatada: formatadorDeData(contrato.data_encerramento)
    }));
  };

  onBuscarClick = filtros => {
    getContratos(filtros).then(contratos => {
      const response = this.adicionarDataFormatada(contratos)
      this.setState({ contratos: response, filtros });
    });
  };

  componentDidMount() {
    this.setaMeusContratos();
  }

  render() {
    const { contratos } = this.state;
    return (
      <Page titulo="Contratos Contínuos">
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
