import React, { Component } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { getDivisoes } from "../../../service/Divisoes.service";

export default class SelecionarDivisoes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selected: null
    };
  }

  async componentDidMount() {
    const divisoes = await getDivisoes();
    this.formataOptions(divisoes);
    this.setState({ selected: this.props.selected });
  }

  formataOptions(divisoes) {
    const options = this.state.options;
    divisoes.map(value => {
      options.push({ label: value.sigla, value: value.uuid });
    });
    this.setState({ options });
  }

  onSelect(e) {
    const event = e.target;
    this.setState({ selected: event.value });
    this.props.onSelect(event.value);
  }

  render() {
    const { selected } = this.props;
    const { options } = this.state;

    return (
      <FormGroup>
        <Label for="selecionarDivisoes">Divisão Responsável</Label>
        <Input type="select" {...this.props} onChange={event => this.onSelect(event)} name="divisoes" id="selecionarDivisoes">
          {options.map((value, key) => {
            const selecionado = selected === value.value ? true : false;
            return (
              <option
                selected={selecionado}
                key={key}
                value={value.value}
              >
                {value.label}
              </option>
            );
          })}
        </Input>
      </FormGroup>
    );
  }
}
