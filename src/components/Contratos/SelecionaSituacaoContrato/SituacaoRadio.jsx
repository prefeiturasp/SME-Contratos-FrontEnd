import React, { Component } from "react";
import { getSituacoesContrato } from "../../../service/Contratos.service";
import { FormGroup, Label, Input } from "reactstrap";

class SituacaoRadio extends Component {
  state = {
    situacoes: [],
    situacaoSelecionada: null,
  };

  selecionaSituacao(event) {
    this.setState({ situacaoSelecionada: event.target.value });
    this.props.onSelect(event.target.value);
  }

  async componentDidMount() {
    const situacoes = await getSituacoesContrato();
    this.setState({ situacoes });
  }

  render() {
    const { situacoes } = this.state;
    const { checado } = this.props;
    return (
      <div>
        {situacoes.map(value => {
          const selecionado = value.id === checado ? true : false;
          return (
            <FormGroup key={value.id} check inline>
              <Label check>
                <Input
                  {...this.props}
                  type="radio"
                  checked={selecionado}
                  name="situacao"
                  value={value.id}
                  onChange={event => this.selecionaSituacao(event)}
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

export default SituacaoRadio;
