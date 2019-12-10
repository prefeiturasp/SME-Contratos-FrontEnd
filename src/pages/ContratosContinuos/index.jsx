import React, { Component } from "react";
import { Messages } from "primereact/messages";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { TableContrato } from "../../components/Contratos/TableContrato";
import {
  getContratos,
  getCamposContrato
} from "../../service/Contratos.service";
import "./style.scss";
import { BuscaContratosForm } from "../../components/Contratos/BuscaContratosForm";
import { SelecionaColunasContrato } from "../../components/Contratos/SelecionaColunasContrato";
import { getUsuario } from "../../service/auth.service";
import { getUrlParams } from "../../utils/params";
import { Button, ButtonGroup } from "reactstrap";
import { redirect } from "../../utils/redirect";
import CoadAccordion from "../../components/Global/CoadAccordion";
import { CoadTabs } from "../../components/Contratos/CoadTabs";

class ContratosContinuos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      contratos: [],
      colunas: [
        { field: "row_index", header: "#" },
        { field: "processo", header: "Processo" },
        { field: "tipo_servico.nome", header: "Tipode de Serviço" },
        { field: "empresa_contratada.nome", header: "Empresa" },
        { field: "estado_contrato", header: "Estado do Contrato" },
        { field: "data_encerramento", header: "Data Encerramento" }
      ],
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
  async setaColunasDefaut() {
    const colUsuario = await getCamposContrato();
    const colunasUsuario = colUsuario[0];
    if (colunasUsuario || colunasUsuario.length !== 0) {
      this.setState({
        colunas: colunasUsuario.colunas_array,
        uuid: colunasUsuario.uuid
      });
    }
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

  onAplicarClick = colunas => {
    this.setState({ colunas });
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

    const param = getUrlParams();
    if (param.cadastro) {
      this.messages.show({
        severity: "success",
        life: 10000,
        detail: "Contrato cadastrado com sucesso"
      });
    }
    this.pegaParametrosUrl();
    this.setaMeusContratos();
    this.setaColunasDefaut();
  }

  render() {
    const { contratos, colunas } = this.state;
    return (
      <Page>
        <Messages ref={el => (this.messages = el)}></Messages>
        <h4>Contratos Contínuos</h4>
        <ButtonGroup className="mb-4">
          <Button
            onClick={() => redirect("#/painel-selecao")}
            className="btn-coad-background-outline"
            size="sm"
          >
            <i className="pi pi-table mx-4"></i>
          </Button>
          <Button className="btn-coad-background" size="sm" outline>
            <i className="pi pi-list mx-4"></i>
          </Button>
        </ButtonGroup>
        <Container icone="pi pi-chart-bar" subtitulo="Vizualizar Contratos">
          <CoadAccordion titulo="Personalizar filtro de busca">
            <CoadTabs
              titulo1={"Personalizar Filtros"}
              titulo2={"Personalizar Colunas"}
              conteudo1={
                <BuscaContratosForm
                  onBuscarClick={filtros => this.onBuscarClick(filtros)}
                />
              }
              conteudo2={
                <SelecionaColunasContrato
                  uuid={this.state.uuid}
                  onAplicarClick={this.onAplicarClick}
                />
              }
            />
          </CoadAccordion>
          <TableContrato contratos={contratos} colunas={colunas} />
        </Container>
      </Page>
    );
  }
}

export default ContratosContinuos;
