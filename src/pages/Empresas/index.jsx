import React, { useState, useEffect } from "react";
import { FormGroup, Label } from "reactstrap";
import moment from "moment";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { CREATED, OK } from "http-status-codes";
import { redirect } from "../../utils/redirect";
import { getUrlParams } from "../../utils/params";
import useToast from "../../hooks/useToast";
import Container from "../../components/Global/Container";
import Page from "../../components/Global/Page";

import { TIPO_FORNECEDOR, TIPO_SERVICO, SITUACAO_EMPRESA } from "./constantes";
import { getEnderecoPorCEP } from "../../service/cep.service";
import {
  alteraEmpresa,
  criaEmpresa,
  getEmpresa,
} from "../../service/Empresas.service";
import { removeCaracteresEspeciais } from "../../utils/formatador";
import "./style.scss";
import { validarCNPJ } from "../../utils/validadores";
import { deepCopy } from "../../utils/deepCopy";
import { EMPRESAS, LISTAR_EMPRESAS } from "../../configs/urls.constants";
import { mascaraTelefoneOuCelular } from "./helper";

let valoresIniciais = {
  contatos: [
    {
      email: "",
      cargo: "",
      nome: "",
      rg: "",
    },
  ],
  razao_social: "",
  nome: "",
  endereco: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
};

const Empresas = () => {
  const { uuid } = getUrlParams();
  const [visivel, setVisivel] = useState(false);
  const [visivelCancelar, setVisivelCancelar] = useState(false);
  const [empresaInicial, setEmpresaInicial] = useState(valoresIniciais);
  const [contatosIniciais, setContatosIniciais] = useState(
    valoresIniciais.contatos,
  );
  const [empresa, setEmpresa] = useState({});
  const [contatos, setContatos] = useState([{}]);
  const [incluir, setIncluir] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (uuid) {
      (async () => {
        const dados = await getEmpresa(uuid);
        dados.data_cadastro = moment(dados.criado_em, "YYYY-MM-DD").format(
          "DD/MM/YYYY",
        );
        setContatos(dados.contatos);
        setEmpresa(dados);
        setEmpresaInicial(dados);
        setContatosIniciais(deepCopy(dados.contatos));
      })();
    }
  }, [uuid, setEmpresa]);

  useEffect(() => {
    const parametro = getUrlParams();
    if (!parametro.uuid) {
      setIncluir(false);
    }
  }, [empresa]);

  const fechaDialog = () => {
    setVisivel(false);
  };

  const exibeDialog = () => {
    setVisivel(true);
  };

  const formatarEmpresa = () => {
    let empresaFormatada = { ...empresa };
    delete empresaFormatada.data_cadastro;
    empresaFormatada.tipo_servico = empresa.tipo_servico.id;
    if (empresa.tipo_fornecedor)
      empresaFormatada.tipo_fornecedor = empresa.tipo_fornecedor.id;
    empresaFormatada.situacao = empresa.situacao.id;
    empresaFormatada.contatos = [...contatos];
    empresaFormatada.contatos.map(
      contato =>
        (contato.telefone = contato.telefone
          .replace(/[()]/g, "")
          .replace("-", " ")),
    );
    empresaFormatada.cnpj = removeCaracteresEspeciais(empresa.cnpj);
    empresaFormatada.cep = removeCaracteresEspeciais(empresa.cep);
    return empresaFormatada;
  };
  const criarEmpresa = async () => {
    if (validarCNPJ(removeCaracteresEspeciais(empresa.cnpj))) {
      try {
        let ataFormatada = formatarEmpresa();
        const resultado = await criaEmpresa(ataFormatada);
        if (resultado.status === CREATED) {
          let mensagemSucesso =
            empresa.situacao && empresa.situacao.id === "INATIVA"
              ? "Empresa cadastrada com sucesso"
              : "Empresa criada com sucesso";
          toast.showSuccess(mensagemSucesso);
          redirect("#/listar-empresas");
        }
      } catch (e) {
        mapeiaErros(e.response.data);
      }
    } else {
      toast.showError("Digite um CNPJ válido");
    }
  };

  const mapeiaErros = async erros => {
    if (erros.contatos) {
      let email = erros.contatos.some(contato => contato.email);
      if (email) {
        toast.showError("Insira um endereço de email válido.");
      }
    } else if (
      typeof erros === "string" &&
      erros.startsWith("IntegrityError")
    ) {
      toast.showError("Empresa com este CNPJ já existe.");
    }
  };

  const alterarEmpresa = async () => {
    if (validarCNPJ(removeCaracteresEspeciais(empresa.cnpj))) {
      try {
        let empresaFormatada = formatarEmpresa();
        const resultado = await alteraEmpresa(empresaFormatada);
        if (resultado.status === OK) {
          toast.showSuccess("Cadastro alterado com sucesso.");
          redirect("#/listar-empresas");
        }
      } catch (e) {
        mapeiaErros(e.response.data);
      }
    } else {
      toast.showError("Digite um CNPJ válido");
    }
  };

  const buscarCEP = async e => {
    let response = await getEnderecoPorCEP(e.value.replace("-", ""));
    if (response.status === 200 && !response.data.erro) {
      let dados = response.data;
      setEmpresa({
        ...empresa,
        cep: e.value,
        endereco: dados.logradouro,
        cidade: dados.localidade,
        estado: dados.uf,
        bairro: dados.bairro,
      });
    } else {
      toast.showError(
        "Houve um erro ao consultar o CEP especificado. Tente novamente ou preencha os campos manualmente.",
      );
      setEmpresa({
        ...empresa,
        cep: e.value,
      });
    }
  };

  const atualizaContato = (chave, index, valor) => {
    let contatosNew = [...contatos];
    contatosNew[index][chave] = valor;
    setContatos(contatosNew);
  };

  const novoContato = () => {
    let contatosNew = [...contatos];
    contatosNew.push({});
    setContatos(contatosNew);
  };
  const removeContato = index => {
    let contatosNew = [...contatos];
    contatosNew.splice(index, 1);
    setContatos(contatosNew);
  };

  const validaContatos = () => {
    let validacao = contatos.filter(
      contato =>
        contato.nome &&
        contato.email &&
        contato.cargo &&
        contato.rg &&
        contato.telefone &&
        contato.telefone.length > 0,
    );
    if (validacao.length !== contatos.length) return false;
    else return true;
  };

  const verificaTipoFornecedor = tipo_servico => {
    if (tipo_servico === TIPO_SERVICO[2]) {
      return undefined;
    } else {
      return empresa.tipo_fornecedor;
    }
  };

  const cancelarEmpresa = () => {
    setEmpresa(empresaInicial);
    setContatos(deepCopy(contatosIniciais));
  };

  const tituloConfirmacao = incluir ? "Salvar alterações" : "Confirmar";

  const mensagemConfirmacao = incluir
    ? "Deseja salvar as alterações do cadastro?"
    : empresa.situacao && empresa.situacao.id === "INATIVA"
    ? "Empresa não está apta e não será possível inseri-la em um Contrato"
    : "Confirma a criação de uma nova empresa?";
  const habilitaBotao =
    validaContatos() &&
    empresa.cnpj &&
    empresa.razao_social &&
    empresa.nome &&
    empresa.tipo_servico &&
    (empresa.tipo_fornecedor ||
      empresa.tipo_servico === TIPO_SERVICO[TIPO_SERVICO.length - 1]) &&
    empresa.situacao &&
    empresa.cep &&
    empresa.endereco &&
    empresa.bairro &&
    empresa.cidade &&
    empresa.estado &&
    empresa.numero;

  return (
    <>
      <Page
        titulo="Cadastro de Empresas"
        breadcrumb={[
          { label: "Cadastros" },
          { label: "Empresas", url: "#" + LISTAR_EMPRESAS },
          { label: "Nova Empresa", url: "#" + EMPRESAS },
        ]}
        onClickVoltar={() => redirect("#/listar-empresas")}
      >
        <Container classe="alinhamento">
          <Dialog
            header={"Cancelar "}
            visible={visivelCancelar}
            style={{ width: "60vw" }}
            modal={true}
            onHide={() => setVisivelCancelar(false)}
            footer={
              <FormGroup className="pt-4 d-flex justify-content-end">
                <Button
                  className="btn-coad-background-outline"
                  label="Sim"
                  onClick={() => {
                    setVisivelCancelar(false);
                    toast.showSuccess("Alterações canceladas");
                    cancelarEmpresa();
                  }}
                />
                <Button
                  className="btn-coad-primary mx-2"
                  onClick={() => setVisivelCancelar(false)}
                  label="Não"
                />
              </FormGroup>
            }
          >
            <p>Deseja cancelar preenchimento das informações?</p>
            <p>Os dados inseridos não serão salvos</p>
          </Dialog>
          <Dialog
            header={tituloConfirmacao}
            visible={visivel}
            style={{ width: "60vw" }}
            modal={true}
            onHide={fechaDialog}
          >
            <span>{mensagemConfirmacao}</span>
            <FormGroup className="pt-4 d-flex justify-content-end">
              <Button
                className="btn-coad-background-outline mx-2"
                onClick={fechaDialog}
                label="Não"
              />
              {!incluir ? (
                <Button
                  className="btn-coad-primary"
                  label={
                    empresa.situacao && empresa.situacao.id === "INATIVA"
                      ? "Ciente"
                      : "Sim"
                  }
                  onClick={criarEmpresa}
                />
              ) : (
                <Button
                  className="btn-coad-primary"
                  label="Sim"
                  onClick={alterarEmpresa}
                />
              )}
            </FormGroup>
          </Dialog>
          <br />
          <h5 className="titulo-secao">Empresa</h5>
          <div className="p-grid">
            <div className="p-col-4 info-required">
              <Label className="font-weight-bold">CNPJ</Label>
              <InputMask
                className="w-100"
                mask="99.999.999/9999-99"
                value={empresa.cnpj}
                autoClear={false}
                placeholder="Ex.: 00.000.000/0000-00"
                onChange={e => setEmpresa({ ...empresa, cnpj: e.value })}
              />
            </div>

            <div className="p-col-8 info-required">
              <Label className="font-weight-bold info-required">
                Razão Social
              </Label>
              <InputText
                className="w-100"
                value={empresa.razao_social}
                onChange={e =>
                  setEmpresa({ ...empresa, razao_social: e.target.value })
                }
              />
            </div>

            <div className="p-col-8">
              <Label className="font-weight-bold">Nome Fantasia</Label>
              <InputText
                className="w-100"
                value={empresa.nome}
                onChange={e => setEmpresa({ ...empresa, nome: e.target.value })}
              />
            </div>

            <div className="p-col-4 info-required">
              <Label className="font-weight-bold">Data de Cadastro</Label>
              <InputText
                className="w-100"
                value={
                  empresa.data_cadastro
                    ? empresa.data_cadastro
                    : moment().format("DD/MM/YYYY")
                }
                disabled={true}
              />
            </div>

            <div className="p-col-4 info-required">
              <Label className="font-weight-bold">Tipo de Serviço</Label>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={TIPO_SERVICO}
                value={empresa.tipo_servico}
                onChange={e =>
                  setEmpresa({
                    ...empresa,
                    tipo_servico: e.target.value,
                    tipo_fornecedor: verificaTipoFornecedor(e.target.value),
                  })
                }
                placeholder="Selecione"
              />
            </div>

            <div className="p-col-4 info-required">
              <Label className="font-weight-bold">Tipo de Empresa</Label>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={TIPO_FORNECEDOR}
                value={empresa.tipo_fornecedor}
                onChange={e =>
                  setEmpresa({ ...empresa, tipo_fornecedor: e.target.value })
                }
                placeholder="Selecione"
                disabled={
                  empresa.tipo_servico === TIPO_SERVICO[TIPO_SERVICO.length - 1]
                }
              />
            </div>

            <div className="p-col-4 info-required">
              <Label className="font-weight-bold">Situação</Label>
              <Dropdown
                className="w-100"
                optionLabel="nome"
                options={SITUACAO_EMPRESA}
                value={empresa.situacao}
                onChange={e =>
                  setEmpresa({ ...empresa, situacao: e.target.value })
                }
                placeholder="Selecione"
              />
            </div>
          </div>

          <hr />

          <h5 className="titulo-secao">Endereço</h5>

          <div className="p-grid">
            <div className="p-col-4 info-required">
              <Label className="font-weight-bold">CEP</Label>
              <InputMask
                className="w-100"
                mask="99999-999"
                value={empresa.cep}
                autoClear={false}
                placeholder="Ex.: 00000-00"
                onComplete={e => buscarCEP(e)}
              />
            </div>

            <div className="p-col-6">
              <Label className="font-weight-bold">Logradouro</Label>
              <InputText
                className="w-100"
                value={empresa.endereco}
                onChange={e =>
                  setEmpresa({ ...empresa, endereco: e.target.value })
                }
              />
            </div>

            <div className="p-col-2 info-required">
              <Label className="font-weight-bold">Número</Label>
              <InputText
                className="w-100"
                value={empresa.numero}
                onChange={e =>
                  setEmpresa({
                    ...empresa,
                    numero: removeCaracteresEspeciais(e.target.value),
                  })
                }
              />
            </div>

            <div className="p-col-4">
              <Label className="font-weight-bold">Complemento</Label>
              <InputText
                className="w-100"
                value={empresa.complemento}
                onChange={e =>
                  setEmpresa({
                    ...empresa,
                    complemento: removeCaracteresEspeciais(e.target.value),
                  })
                }
              />
            </div>

            <div className="p-col-3">
              <Label className="font-weight-bold">Bairro</Label>
              <InputText
                className="w-100"
                value={empresa.bairro}
                onChange={e =>
                  setEmpresa({ ...empresa, bairro: e.target.value })
                }
              />
            </div>

            <div className="p-col-4">
              <Label className="font-weight-bold">Cidade</Label>
              <InputText
                className="w-100"
                value={empresa.cidade}
                onChange={e =>
                  setEmpresa({ ...empresa, cidade: e.target.value })
                }
              />
            </div>

            <div className="p-col-1">
              <Label className="font-weight-bold">UF</Label>
              <InputText
                className="w-100"
                value={empresa.estado}
                onChange={e =>
                  setEmpresa({ ...empresa, estado: e.target.value })
                }
              />
            </div>
          </div>

          <hr />

          <h5 className="titulo-secao">Contatos</h5>

          {contatos.map((contato, index) => (
            <>
              <div className={index > 0 ? "p-grid mt-5" : "p-grid"}>
                <div className="p-col-8 info-required">
                  <Label className="font-weight-bold">
                    Nome do Representante
                  </Label>
                  <InputText
                    className="w-100"
                    value={contato.nome}
                    onChange={e =>
                      atualizaContato("nome", index, e.target.value)
                    }
                  />
                </div>
                <div className="p-col-4 info-required">
                  <Label className="font-weight-bold">Cargo</Label>
                  <InputText
                    className="w-100"
                    value={contato.cargo}
                    onChange={e =>
                      atualizaContato("cargo", index, e.target.value)
                    }
                  />
                </div>
                <div className="p-col-3 info-required">
                  <Label className="font-weight-bold">RG</Label>
                  <InputText
                    className="w-100"
                    value={contato.rg}
                    onChange={e => atualizaContato("rg", index, e.target.value)}
                  />
                </div>
                <div className="p-col-3 info-required">
                  <Label className="font-weight-bold">Telefone</Label>
                  <InputText
                    className="w-100"
                    value={mascaraTelefoneOuCelular(
                      contato.telefone ? contato.telefone : "",
                    )}
                    onChange={e =>
                      atualizaContato("telefone", index, e.target.value)
                    }
                    autoClear={false}
                  />
                </div>

                <div className="p-col-5 contato-email  info-required">
                  <Label className="font-weight-bold">Email</Label>
                  <InputText
                    className="w-100"
                    value={contato.email}
                    onChange={e =>
                      atualizaContato("email", index, e.target.value)
                    }
                  />
                </div>

                <div className="p-col-1 contato-acoes">
                  {index === 0 ? (
                    <div>
                      <Label className="hide-label w-100">.</Label>
                      <Button
                        className="btn-coad-background-outline contato-add"
                        label="+"
                        onClick={() => novoContato()}
                      />
                    </div>
                  ) : (
                    <div>
                      <Label className="hide-label w-100">.</Label>
                      <Button
                        className="btn-coad-background-outline contato-add"
                        label="x"
                        onClick={() => removeContato(index)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          ))}

          <FormGroup className="d-flex flex-row-reverse m-acoes">
            <Button
              disabled={!habilitaBotao}
              className="btn-coad-primary mr-1"
              label="Salvar"
              onClick={exibeDialog}
            />
            <Button
              className="btn-coad-background-outline mr-2"
              label="Cancelar"
              onClick={() => setVisivelCancelar(true)}
            />
          </FormGroup>
        </Container>
      </Page>
    </>
  );
};

export default Empresas;
