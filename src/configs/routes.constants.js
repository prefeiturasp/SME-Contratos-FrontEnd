import Home from "../pages/Home";
import ListaContrato from "../pages/ListaContrato";
import painelSelecao from "../pages/PainelSelecao";
import ContratosContinuos from "../pages/ContratosContinuos";
import VisualizarContratos from "../pages/VisualizarContrato";
import DesignacaoCargos from "../pages/DesignacaoCargos"
import AtribuicaoTermoContrato from "../pages/AtribuicaoTermoContrato"


const RoutesConfig = [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/lista_contratos",
        component: ListaContrato,
        exact: false
    },
    {
        path: "/painel-selecao",
        component: painelSelecao,
        exact: false
    },
    {
      path: "/contratos-continuos",
      component: ContratosContinuos,
      exact: false
    },
    {
      path: "/visualizar-contrato",
      component: VisualizarContratos,
      exact: false
    },
    {
      path: "/designacao-cargos",
      component: DesignacaoCargos,
      exact: false
    },
    {
      path: "/atribuicao-termo-contrato",
      component: AtribuicaoTermoContrato,
      exact: false
    },
]

export default RoutesConfig

export const MenuConfig = [
    {
      label: "Contratos",
      icon: "pi pi-list",
      items: [
        { label: "Consultar", icon: "pi pi-fw pi-th-large", to: "/painel-selecao" },
        { label: "Atribuição Termo Contratos", icon: "pi pi-cog pi-th-large", to: "/atribuicao-termo-contrato" },
      ]
    },
    {
      label: "Orçamento",
      icon: "pi pi-money-bill",
      command: () => {
        window.location = '#'
      }
    },
    {
      label: "Estoque / Patrimônio",
      icon: "pi pi-clone",
      command: () => {
        window.location = '#'
      }
    },
    {
      label: "Obras",
      icon: "pi pi-users",
      command: () => {
        window.location = '#'
      }
    },
    {
      label: "Relatórios",
      icon: "pi pi-chart-bar",
      command: () => {
        window.location = '#'
      }
    },
    {
      label: "Configurações",
      icon: "pi pi-cog",
      items: [
        { label: "Designação de Cargos", icon: "pi pi-cog pi-th-large", to: "/designacao-cargos" },
      ]
    },
]
