import React, { Component } from "react";
import Page from "../../components/Page";
import Container from "../../components/Container";
import { TabView, TabPanel } from "primereact/tabview";
import { Accordion, AccordionTab } from "primereact/accordion";
import { TableContrato } from "../../components/Contratos/TableContrato";
import { getContratos } from "../../service/Contratos.service";
import "./style.scss";
import { BuscaContratosForm } from "../../components/Contratos/BuscaContratosForm";
import { getUsuario } from "../../service/auth.service";
import { getUrlParams } from "../../utils/params";
import { Button, ButtonGroup } from "reactstrap";
import { redirect } from "../../utils/redirect";

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
      this.setState({ contratos });
    });
  }


  onBuscarClick = filtros => {
    getContratos(filtros).then(contratos => {
      this.setState({ contratos, filtros });
    });
  };

  pegaParametrosUrl = () => {
    const params = getUrlParams();
    const key = Object.keys(params)[0];
    let filtros = this.state.filtros;
    switch (key) {
      case "equipamento":
        filtros.equipamento = params[key];
        break;
      case "tipo_servico":
        filtros.tipo_servico = params[key];
        break;
      default:
    }

    this.setState({ filtros });
  };

  componentDidMount() {
    this.pegaParametrosUrl();
    this.setaMeusContratos();
  }

  render() {
    const { contratos } = this.state;
    return (
      <Page titulo="Contratos Contínuos">
         <ButtonGroup className="mb-4">
          <Button onClick={()=> redirect('#/painel-selecao')} className="btn-coad-background-outline" size="sm"><i className="pi pi-table mx-4"></i></Button>
          <Button className="btn-coad-background" size="sm" outline><i className="pi pi-list mx-4"></i></Button>
        </ButtonGroup>
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
