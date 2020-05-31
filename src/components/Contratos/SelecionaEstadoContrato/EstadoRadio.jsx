import React, { Component } from "react";
import { getEstadosContrato } from "../../../service/Contratos.service";
import { FormGroup, Label, Input } from "reactstrap";

class EstadoRadio extends Component {
  state = {
    estados: [],
    estadoSelecionada: null
  };

  selecionaEstado(event) {
    this.setState({ estadoSelecionada: event.target.value });
    this.props.onSelect(event.target.value);
  }

  async componentDidMount() {
    const estados = await getEstadosContrato();
    this.setState({ estados });
  }

  render() {
    const { estados } = this.state;
    const { checado } = this.props;
    return (
      <div>
        {estados.map(value => {
          const selecionado = value.id === checado ? true : false;
          return (
            <FormGroup key={value.id} check inline>
              <Label check>
                <Input
                  {...this.props}
                  type="radio"
                  checked={selecionado}
                  name="estado"
                  value={value.id}
                  onChange={event => this.selecionaEstado(event)}
                />
                {value.nome}
              </Label>
            </FormGroup>
          );
        })}
      </div>
    );
  }
}

export default EstadoRadio;
