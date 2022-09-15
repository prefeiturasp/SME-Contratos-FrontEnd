import Home from "../pages/Home";
import ListaContrato from "../pages/ListaContrato";
import painelSelecao from "../pages/PainelSelecao";
import ContratosContinuos from "../pages/ContratosContinuos";
import VisualizarContratos from "../pages/VisualizarContrato";
import AtribuicaoTermoContrato from "../pages/AtribuicaoTermoContrato";
import Teste from "../pages/Teste";
import CadastrarContrato from "../pages/CadastrarContrato";
import Edital from "../pages/Edital";
import ListarEditais from "../pages/ListarEditais";
import GestaoContratos from "../pages/GestaoContratos";
import ListarAtas from "../pages/ListarAtas";
import Atas from "../pages/Atas";
import ListarEmpresas from "../pages/ListarEmpresas";
import Empresas from "../pages/Empresas";
import ListarProdutos from "../pages/ListarProdutos";
import Produtos from "../pages/Produtos";
import Orcamento from "../pages/Orcamento";
import DotacaoOrcamentaria from "../pages/DotacaoOrcamentaria";
import * as constants from "./urls.constants";

const RoutesConfig = [
  {
    path: constants.HOME,
    component: Home,
    exact: true,
  },
  {
    path: constants.LISTA_CONTRATOS,
    component: ListaContrato,
    exact: false,
  },
  {
    path: constants.PAINEL_SELECAO,
    component: painelSelecao,
    exact: false,
  },
  {
    path: constants.CONTRATOS_CONTINUOS,
    component: ContratosContinuos,
    exact: false,
  },
  {
    path: constants.VISUALIZAR_CONTRATOS,
    component: VisualizarContratos,
    exact: false,
  },
  {
    path: constants.ATRIBUICAO_TERMO_CONTRATO,
    component: AtribuicaoTermoContrato,
    exact: false,
  },
  {
    path: constants.GESTAO_CONTRATOS,
    component: GestaoContratos,
    exact: false,
  },
  {
    path: constants.LISTAR_ATAS,
    component: ListarAtas,
    exact: false,
  },
  {
    path: constants.ATAS,
    component: Atas,
    exact: false,
  },
  {
    path: constants.EMPRESAS,
    component: Empresas,
    exact: false,
  },
  {
    path: constants.LISTAR_EMPRESAS,
    component: ListarEmpresas,
    exact: false,
  },
  {
    path: constants.LISTAR_PRODUTOS,
    component: ListarProdutos,
    exact: false,
  },
  {
    path: constants.PRODUTOS,
    component: Produtos,
    exact: false,
  },
  {
    path: constants.CADASTRAR_CONTRATO,
    component: CadastrarContrato,
    exact: false,
  },
  {
    path: constants.EDITAL,
    component: Edital,
    exact: false,
  },
  {
    path: constants.LISTAR_EDITAIS,
    component: ListarEditais,
    exact: false,
  },
  {
    path: constants.TESTE,
    component: Teste,
    exact: false,
  },
  {
    path: constants.ORCAMENTO,
    component: Orcamento,
    exact: false,
  },
  {
    path: constants.DOTACAO_ORCAMENTARIA,
    component: DotacaoOrcamentaria,
    exact: false,
  },
];

export default RoutesConfig;

export const MenuConfig = [
  {
    label: "Cadastros",
    icon: "pi pi-list",
    items: [
      {
        label: "Empresas",
        icon: "pi pi-cog pi-th-large",
        to: constants.LISTAR_EMPRESAS,
      },
      {
        label: "Produtos",
        icon: "pi pi-cog pi-th-large",
        to: constants.LISTAR_PRODUTOS,
      },
    ],
  },
  {
    label: "Contratos",
    icon: "fas fa-file-contract",
    items: [
      {
        label: "Gestão de Contratos",
        icon: "pi pi-cog pi-th-large",
        to: constants.GESTAO_CONTRATOS,
      },
      {
        label: "Editais",
        icon: "pi pi-cog pi-th-large",
        to: constants.LISTAR_EDITAIS,
      },
      {
        label: "Atas",
        icon: "pi pi-cog pi-th-large",
        to: constants.LISTAR_ATAS,
      },
      {
        label: "Atribuição Termo Contratos",
        icon: "pi pi-cog pi-th-large",
        to: constants.ATRIBUICAO_TERMO_CONTRATO,
      },
    ],
  },

  {
    label: "Orçamento",
    icon: "pi pi-money-bill",
    to: constants.ORCAMENTO,
  },
  {
    label: "Relatórios",
    icon: "pi pi-chart-bar",
    command: () => {
      window.location = "#";
    },
  },
];
