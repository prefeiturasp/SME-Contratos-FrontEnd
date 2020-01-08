import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated, verifyToken } from "./service/auth.service";
import RoutesConfig from "./configs/routes.constants";
import Login from "./pages/Login";

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

export const Routers = () => {
  const verificarToken = async () => {
    const tempoToken = await verifyToken();
  };
  useEffect(() => {
    if(window.location.hash !== '#/login'){
      verificarToken();
    }
  });
  return (
    <Switch>
      <Route exact path="/login" component={Login} />

      {RoutesConfig.map((value, key) => {
        return (
          <PrivateRoute
            key={key}
            path={value.path}
            exact={value.exact}
            component={value.component}
          />
        );
      })}
    </Switch>
  );
};

export default Routers;
