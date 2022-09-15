import React from "react";
import { InputMask } from "primereact/inputmask";
import { Row, Label, Input } from "reactstrap";

import { SelecionaEmpresa } from "../SelecionaEmpresa";
import CoadAccordion from "../../Global/CoadAccordion";

export function AccordionEmpresaContratada({
  aberto,
  empresaContratada,
  atualizaEmpresa,
  disabilitado,
}) {
  return (
    <CoadAccordion aberto={aberto} titulo={"Empresa Contratada"}>
      <Row>
        <div className="p-grid">
          <div className="p-col-8">
            <Label className="font-weight-bold">Nome Fantasia</Label>
            <SelecionaEmpresa
              className="w-100"
              campo="nome"
              empresa={empresaContratada}
              onSelect={e => atualizaEmpresa(e)}
              disabled={disabilitado}
              filter
            />
          </div>
          <div className="p-col-6">
            <Label className="font-weight-bold">CNPJ da Empresa</Label>
            <InputMask
              className="w-100"
              mask="99.999.999/9999-99"
              value={empresaContratada.cnpj}
              disabled={true}
            />
          </div>
          <div className="p-col-6">
            <Label className="font-weight-bold">Razão Social</Label>
            <Input
              className="w-100"
              value={empresaContratada.razao_social}
              disabled={true}
            />
          </div>
          <div className="p-col-6">
            <Label className="font-weight-bold">Tipo de Serviço</Label>
            <Input
              className="w-100"
              value={
                empresaContratada.tipo_servico
                  ? empresaContratada.tipo_servico.nome
                  : empresaContratada.tipo_servico
              }
              disabled={true}
            />
          </div>
          <div className="p-col-6">
            <Label className="font-weight-bold">Tipo de Fornecedor</Label>
            <Input
              className="w-100"
              value={
                empresaContratada.tipo_fornecedor
                  ? empresaContratada.tipo_fornecedor.nome
                  : empresaContratada.tipo_fornecedor
              }
              disabled={true}
            />
          </div>
        </div>
      </Row>
      <Row>
        <Label className="font-weight-bold">Endereço</Label>
        <div className="p-grid">
          <div className="p-col-2">
            <Label className="font-weight-bold">CEP</Label>
            <InputMask
              className="w-100"
              mask="99.999-999"
              value={empresaContratada.cep}
              disabled={true}
            />
          </div>
          <div className="p-col-8">
            <Label className="font-weight-bold">Endereço</Label>
            <Input
              className="w-100"
              value={empresaContratada.endereco}
              disabled={true}
            />
          </div>
          <div className="p-col-2">
            <Label className="font-weight-bold">Número</Label>
            <Input
              className="w-100"
              value={empresaContratada.numero}
              disabled={true}
            />
          </div>
          <div className="p-col-3">
            <Label className="font-weight-bold">Complemento</Label>
            <Input
              className="w-100"
              value={empresaContratada.complemento}
              disabled={true}
            />
          </div>
          <div className="p-col-3">
            <Label className="font-weight-bold">Bairro</Label>
            <Input
              className="w-100"
              value={empresaContratada.bairro}
              disabled={true}
            />
          </div>
          <div className="p-col-4">
            <Label className="font-weight-bold">Cidade</Label>
            <Input
              className="w-100"
              value={empresaContratada.cidade}
              disabled={true}
            />
          </div>
          <div className="p-col-2">
            <Label className="font-weight-bold">UF</Label>
            <Input
              className="w-100"
              value={empresaContratada.estado}
              disabled={true}
            />
          </div>
        </div>
      </Row>
      <Row>
        {empresaContratada.contatos && (
          <Label className="font-weight-bold">Contatos</Label>
        )}
        {empresaContratada.contatos &&
          empresaContratada.contatos.map(contato => {
            return (
              <>
                <div className="p-grid">
                  <div className="p-col-7">
                    <Label className="font-weight-bold">E-mail</Label>
                    <Input
                      className="w-100"
                      value={contato.email}
                      disabled={true}
                    />
                  </div>
                  <div className="p-col-5">
                    <Label className="font-weight-bold">Cargo/Função</Label>
                    <Input
                      className="w-100"
                      value={contato.cargo}
                      disabled={true}
                    />
                  </div>
                  <div className="p-col-8">
                    <Label className="font-weight-bold">Nome</Label>
                    <Input
                      className="w-100"
                      value={contato.nome}
                      disabled={true}
                    />
                  </div>
                  <div className="p-col-4">
                    <Label className="font-weight-bold">Telefone</Label>
                    <InputMask
                      className="w-100"
                      mask="(99) 99999-9999"
                      value={contato.telefone}
                      disabled={true}
                    />
                  </div>
                </div>
              </>
            );
          })}
      </Row>
    </CoadAccordion>
  );
}
