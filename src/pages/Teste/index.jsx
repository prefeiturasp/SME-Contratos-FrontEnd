import React, { useState, useEffect } from "react";
import Page from "../../components/Global/Page";
import Container from "../../components/Global/Container";
import { Input, Label, FormGroup, Card, Table } from "reactstrap";

export default props => {
  const payload = [
    {
      titulo: "Modelo 1",
      grupos_de_verificao: [
        {
          nome: "Grupo 1",
          itens: [
            { ordem: 1, descricao: "descrição de item 1" },
            { ordem: 2, descricao: "descrição de item 2" },
            { ordem: 3, descricao: "descrição de item 3" },
            { ordem: 4, descricao: "descrição de item 4" }
          ]
        },
        {
          nome: "Grupo 2",
          itens: [
            { ordem: 1, descricao: "descrição de item 1" },
            { ordem: 2, descricao: "descrição de item 2" },
            { ordem: 3, descricao: "descrição de item 3" },
            { ordem: 4, descricao: "descrição de item 4" }
          ]
        },
        {
          nome: "Grupo 3",
          itens: [
            { ordem: 1, descricao: "descrição de item 1" },
            { ordem: 2, descricao: "descrição de item 2" },
            { ordem: 3, descricao: "descrição de item 3" },
            { ordem: 4, descricao: "descrição de item 4" }
          ]
        }
      ]
    }
  ];
  const [modelos, setModelos] = useState(payload);
  return (
    <Page titulo="Teste">
      <Container subtitulo="Página de Teste" icone="pi pi-chart-bar">
        {modelos.map((modelo, index) => {
          return <Modelo grupos={modelo.grupos_de_verificao} modelo={modelo} />;
        })}
      </Container>
    </Page>
  );
};

export const Modelo = props => {
  const [modelo, setModelo] = useState(props.modelo);
  const [grupos, setGrupos] = useState(props.grupos);
  return (
    <>
      <br />
      <br />
      <h2>Criar Modelo de Ateste</h2>
      <FormGroup>
        <Label for="modelo">Título do Modelo de Ateste</Label>
        <Input
          id="modelo"
          onChange={e => setModelo(e.target.value)}
          value={modelo.titulo}
          placeholder="Ex: Ateste de avaliação de Serviços de Limpeza Escolar"
        />
      </FormGroup>
      <FormGroup>
        <Label>Grupo(s) de verificação</Label>
        {grupos.map((grupo, i) => (
          <Grupo grupo={grupo} itens={grupo.itens} />
        ))}
      </FormGroup>
    </>
  );
};

export const Grupo = props => {
  const [grupo, setGrupo] = useState(props.grupo);
  const [itens, setItens] = useState(props.itens);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setMensagem("Ainda não existem itens de verificação adicionados no ateste");
  });

  const addItens = () => {
    const index = getLastIndex();
    const item = { ordem: index, descricao: "Novo Item: " + index };
    itens.push(item);
    setItens([...itens]);
  };

  const removeItem = index => {
    itens.splice(index, 1);
    setItens([...itens]);
  };

  const getLastIndex = () => {
    let count = 1;
    itens.map(item => {
      count++;
    });

    return count;
  };

  return (
    <Card>
      <FormGroup>
        <Label>Nome de grupo</Label>
        <Input
          value={grupo.nome}
          name={`grupo[]`}
          onChange={e => setGrupo(e.target.value)}
          placeholder="Ex: Materiais e Equipamentos"
        />
      </FormGroup>
      <FormGroup>
        <Label>Lista de itens de verificação</Label>
        <Table>
          <thead>
            <td>#</td>
            <td>Itens de verificação</td>
            <td>Ação</td>
          </thead>
          <tbody>
            {itens
              ? itens.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.ordem}</td>
                      <td>{item.descricao}</td>
                      <td key={i}>
                        <button
                          onClick={() => removeItem(i)}
                          className="btn btn-danger btn-sm"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              : mensagem}
          </tbody>
        </Table>
        <button
          className="btn btn-info btn-sm"
          type="button"
          onClick={() => addItens()}
        >
          <i className="fas fa-plus"></i>
          Add Item
        </button>
      </FormGroup>
    </Card>
  );
};
