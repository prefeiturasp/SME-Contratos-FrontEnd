import React, { Component } from "react";
import { AutoComplete } from "primereact/autocomplete";
import {
  getUsuariosLookup,
  getUsuarioByUserName,
} from "../../../../service/Usuarios.service";

export class BuscaIncrementalCargosProfissoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargoOuProfissao: null,
      cargosProfissoes: [
        {
          nome: "Auxiliar de Cozinha",
          uuid: "1",
          tipo: "Turno 1",
        },
        {
          nome: "Auxiliar de Limpeza",
          uuid: "2",
          tipo: "Turno 2",
        },
      ],
      filteredCargosProfissoes: null,
    };
  }

  async updateServidorFromProps() {
    const servidor = this.props.userName
      ? await getUsuarioByUserName(this.props.userName)
      : null;

    this.setState({ servidor });
  }

  async componentDidMount() {
    const servidores = await getUsuariosLookup();
    this.setState({ servidores });

    this.updateServidorFromProps();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.userName !== this.props.userName) {
      this.updateServidorFromProps();
    }
  }

  onSelectServidor(servidor) {
    if (!servidor) {
      this.props.onUpdate(null);
    } else {
      this.props.onUpdate(servidor);
    }
  }

  updateCargoOuProfissao(cargoOuProfissao) {
    this.setState({ cargoOuProfissao });
    this.props.updateCargoOuProfissao(cargoOuProfissao);
  }

  filtrarCargosProfissoes = (event) => {
    const { cargosProfissoes } = this.state;
    setTimeout(() => {
      var results = cargosProfissoes.filter((servidor) => {
        return servidor.nome
          .toLowerCase()
          .startsWith(event.query.toLowerCase());
      });
      this.setState({ filteredCargosProfissoes: results });
    }, 250);
  };

  render() {
    const { placeholder } = this.props;
    const { cargoOuProfissao, filteredCargosProfissoes } = this.state;
    return (
      <AutoComplete
        {...this.props}
        value={cargoOuProfissao}
        suggestions={filteredCargosProfissoes}
        completeMethod={this.filtrarCargosProfissoes}
        field="nome"
        placeholder={placeholder || "Cargo | Profissão"}
        minLength={1}
        onChange={(e) => this.updateCargoOuProfissao(e.value)}
        onSelect={(e) => this.onSelectServidor(e.value)}
      />
    );
  }
}
