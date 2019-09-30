import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth.service";
import RoutesConfig from './configs/routes.constants'
import Login from "./pages/Login";
import PrimeroAcesso from "./pages/PrimeroAcesso";

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

export default Routers => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/primeiro-acesso" component={PrimeroAcesso} />
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
