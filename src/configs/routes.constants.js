import Home from "../pages/Home";
import ListaContrato from "../pages/ListaContrato";

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
]

export default RoutesConfig