import React, { Component } from "react";
import { AutoComplete } from "primereact/autocomplete";
import {
  getUsuariosLookup,
  getUsuarioByUserName,
} from "../../../service/Usuarios.service";

export class BuscaIncrementalServidores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      servidor_digitado: null,
      servidor: null,
      servidores: [],
      filteredServidores: null,
    };

    this.filterServidores = this.filterServidores.bind(this);
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

  async componentDidUpdate(prevProps) {
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

  updateServidor(servidor) {
    this.setState({ servidor });
  }

  filterServidores(event) {
    setTimeout(() => {
      let results = this.state.servidores.filter(servidor => {
        return servidor.nome
          .toLowerCase()
          .startsWith(event.query.toLowerCase());
      });
      this.setState({ filteredServidores: results });
    }, 250);
  }

  render() {
    return (
      <AutoComplete
        {...this.props}
        value={this.state.servidor}
        suggestions={this.state.filteredServidores}
        completeMethod={this.filterServidores}
        field="nome"
        placeholder={this.props.placeholder || "Servidor"}
        minLength={1}
        onChange={e => this.updateServidor(e.value)}
        onSelect={e => this.onSelectServidor(e.value)}
      />
    );
  }
}
