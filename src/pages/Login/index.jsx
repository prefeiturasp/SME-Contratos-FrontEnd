import React, { useState, Fragment } from "react";
import logoSP from "../../assets/images/logoSP.svg";
import logoSafi from "../../assets/images/logoSafi.svg";
import { login, esqueciMinhaSenha } from "../../service/auth.service";
import Login from "./Login";
import EsqueciSenha from "./EsqueciMinhaSenha";
import RecuperacaoSucesso from "./RecuperacaoSucesso";
import RecuperacaoErro from "./RecuperacaoErro";
import "./style.scss";
import { ProgressSpinner } from "primereact/progressspinner";
import { redirect } from "../../utils/redirect";

const COMPONENTE = {
  LOGIN: 0,
  ESQUECI_SENHA: 1,
  RECUPERACAO_SUCESSO: 2,
  RECUPERACAO_ERRO: 3
};

const Index = props => {
  const [alerta, setAlerta] = useState(false);
  const [componenteAtivo, setComponenteAtivo] = useState(COMPONENTE.LOGIN);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const logar = async (usuario, senha) => {
    const resultado = await login(usuario, senha);
    if (resultado) {
      redirect("/");
    } else {
      setAlerta(true);
    }
  };

  const solicitaLinkRedefinicaoSenha = async usuario => {
    setLoading(true);
    const resultado = await esqueciMinhaSenha(usuario);
    if (resultado.ok) {
      const data = await resultado.json();
      setEmail(data.email);
      setLoading(false);
      setComponenteAtivo(COMPONENTE.RECUPERACAO_SUCESSO);
    } else {
      setLoading(false);
      setComponenteAtivo(COMPONENTE.RECUPERACAO_ERRO);
    }
  };

  const ativaEsqueciSenha = value => {
    setComponenteAtivo(COMPONENTE.ESQUECI_SENHA);
  };

  const renderSwitch = param => {
    switch (param) {
      case COMPONENTE.LOGIN:
        return (
          <Login
            logar={logar}
            isInvalid={alerta}
            ativaEsqueciSenha={ativaEsqueciSenha}
          />
        );
      case COMPONENTE.ESQUECI_SENHA:
        return (
          <EsqueciSenha
            solicitaRedefinicaoSenha={solicitaLinkRedefinicaoSenha}
          />
        );
      case COMPONENTE.RECUPERACAO_SUCESSO:
        return <RecuperacaoSucesso email={email} />;
      case COMPONENTE.RECUPERACAO_ERRO:
        return <RecuperacaoErro />;
      default:
        return (
          <Login
            logar={logar}
            isInvalid={alerta}
            ativaEsqueciSenha={ativaEsqueciSenha}
          />
        );
    }
  };

  return (
    <Fragment>
      <div className="login-bg" />
      <div className="right-half login-coad">
        <div className="container my-auto">
          <div className="logo-safi">
            <img src={logoSafi} alt="" />
          </div>
          {loading ? (
            <div>
              <div className="w-100 my-5 d-flex justify-content-center">
                <ProgressSpinner />
              </div>
              <div className="text-center w-100">
                <p>Processando...</p>
              </div>
            </div>
          ) : (
            renderSwitch(componenteAtivo)
          )}
          <div className="logo-prefeitura">
            <img src={logoSP} alt="" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
