import React, { useState, useEffect, Fragment } from "react";
import logoSP from "../../assets/images/logoSP.svg";
import logoSafi from "../../assets/images/logoSafi.svg";
import {
  login,
  esqueciMinhaSenha,
  redefinirSenha,
  trocarSenha,
  validarPrimeiroAcesso
} from "../../service/auth.service";
import Login from "./Login";
import EsqueciSenha from "./EsqueciMinhaSenha";
import RecuperacaoSucesso from "./RecuperacaoSucesso";
import RecuperacaoErro from "./RecuperacaoErro";
import RedefinirSenha from "./RedefinirSenha";
import "./style.scss";
import { ProgressSpinner } from "primereact/progressspinner";
import { redirect } from "../../utils/redirect";
import { OK } from "http-status-codes";
import { getUrlParams } from "../../utils/params";

const COMPONENTE = {
  LOGIN: 0,
  ESQUECI_SENHA: 1,
  RECUPERACAO_SUCESSO: 2,
  RECUPERACAO_ERRO: 3,
  REDEFINIR_SENHA: 4,
  PRIMEIRO_ACESSO: 5
};

const Index = props => {
  const [alerta, setAlerta] = useState(false);
  const [componenteAtivo, setComponenteAtivo] = useState(COMPONENTE.LOGIN);
  const [hash, setHash] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPrimeiroAcesso, setIsPrimeiroAcesso] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    const paramt = getUrlParams();
    if (paramt.hash) {
      setHash(paramt.hash);
      setComponenteAtivo(COMPONENTE.REDEFINIR_SENHA);
    }
  }, []);

  const logar = async (usuario, senha) => {
    setUsuario(usuario);
    const primeiro = await validarPrimeiroAcesso(usuario);
    if (primeiro) {
      setIsPrimeiroAcesso(true);
      setComponenteAtivo(COMPONENTE.PRIMEIRO_ACESSO);
    } else {
      const resultado = await login(usuario, senha);
      if (resultado) {
        redirect("/");
      } else {
        setMensagem("Usuário e/ou senha inválidos.");
        setAlerta(true);
      }
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

  const chamaRedefinirSenha = async (senha1, senha2) => {
    setAlerta(false);
    if (validaSenhas(senha1, senha2)) {
      const resultado = await redefinirSenha(senha1, senha2, hash);
      if (resultado.status === OK) {
        setComponenteAtivo(COMPONENTE.LOGIN);
        setMensagem("Senha redefinida com sucesso.");
        setAlerta(true);
      } else {
        setMensagem(resultado.detail);
        setAlerta(true);
      }
    }
  };

  const primeiroAcesso = async (senha1, senha2) => {
    setAlerta(false);
    if (validaSenhas(senha1, senha2)) {
      const resultado = await trocarSenha(senha1, senha2, usuario);
      if (resultado.status === OK) {
        setIsPrimeiroAcesso(false);
        setComponenteAtivo(COMPONENTE.LOGIN);
        setMensagem("Senha redefinida com sucesso.");
        setAlerta(true);
      } else {
        setMensagem(resultado.detail);
        setAlerta(true);
      }
    }
  };

  const validaSenhas = (senha1, senha2) => {
    if (senha1 === senha2) {
      return true;
    } else {
      setMensagem("Senhas não correspondem.");
      setAlerta(true);
      return false;
    }
  };

  const renderSwitch = param => {
    switch (param) {
      case COMPONENTE.LOGIN:
        return (
          <Login
            logar={logar}
            isInvalid={alerta}
            mensagem={mensagem}
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
      case COMPONENTE.REDEFINIR_SENHA:
        return (
          <RedefinirSenha
            isInvalid={alerta}
            mensagem={mensagem}
            redefineSenha={chamaRedefinirSenha}
            titulo={"Redefinir Senha"}
          />
        );
      case COMPONENTE.PRIMEIRO_ACESSO:
        return (
          <RedefinirSenha
            isPrimeiroAcesso={isPrimeiroAcesso}
            isInvalid={alerta}
            mensagem={mensagem}
            primeiroAcesso={primeiroAcesso}
            titulo={"Primeiro Acesso"}
          />
        );
      default:
        return (
          <Login
            logar={logar}
            isInvalid={alerta}
            mensagem={mensagem}
            ativaEsqueciSenha={ativaEsqueciSenha}
          />
        );
    }
  };

  return (
    <Fragment>
      <div className="login-bg d-none d-lg-block d-xl-block" />
      <div className="right-half login-coad d-lg-flex">
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
