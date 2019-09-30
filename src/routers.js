import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth.service";
import RoutesConfig from './configs/routes.constants'
import Login from "./pages/Login";
import ListaContrato from "./pages/ListaContrato";

const PrivateRoute = ({ component: Componet, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Componet {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routers = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route path="/listacontratos" component={ListaContrato} />
    {RoutesConfig.map((value, key) => {
        return (
            <PrivateRoute 
            key={key}
            path={value.path}
            exact={value.exact}
            component={value.component}
            />
        )
    })}
  </Switch>
);

export default Routers