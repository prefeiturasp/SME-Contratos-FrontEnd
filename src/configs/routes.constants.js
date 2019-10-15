import Home from "../pages/Home";
import ListaContrato from "../pages/ListaContrato";
import painelSelecao from "../pages/PainelSelecao";


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
        path: "/painel_selecao",
        component: painelSelecao,
        exact: false
    },
]

export default RoutesConfig