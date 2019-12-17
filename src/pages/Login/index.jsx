import React, { useState, Fragment } from "react";
import logoSP from "../../assets/images/logoSP.svg";
import logoSafi from "../../assets/images/logoSafi.svg";
import { login } from "../../service/auth.service";
import Login from "./Login";
import "./style.scss";
import { redirect } from "../../utils/redirect";

const Index = props => {
  const [alerta, setAlerta] = useState(false);

  const logar = async (usuario, senha) => {
    const resultado = await login(usuario, senha);
    if (resultado) {
      redirect("/");
    } else {
      setAlerta(true);
    }
  };
  return (
    <Fragment>
      <div className="login-bg" />
      <div className="right-half">
        <div className="container my-auto">
          <div className="logo-safi">
            <img src={logoSafi} alt="" />
          </div>
          <Login logar={logar} isInvalid={alerta} />
          <div className="logo-prefeitura">
            <img src={logoSP} alt="" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
