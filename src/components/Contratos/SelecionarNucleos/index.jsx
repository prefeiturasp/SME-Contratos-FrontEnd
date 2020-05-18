import React, { Component } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { getNucleos } from "../../../service/Nucleos.service";

export default class SelecionarNucleos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selected: null
    };
  }

  async componentDidMount() {
    const nucleos = await getNucleos();
    this.formataOptions(nucleos);
    this.setState({ selected: this.props.selected });
  }

  formataOptions(nucleos) {
    const options = this.state.options;
    nucleos.map(value => {
      return options.push({
        label: `${value.sigla} (${value.divisao.sigla})`,
        value: value.uuid
      });
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
        <Label for="selecionarNucleos">Núcleo Responsável</Label>
        <Input
          {...this.props}
          type="select"
          onChange={event => this.onSelect(event)}
          name="nucleo"
          id="selecionarNucleos"
          defaultValue={selected}
        >
          {options.map((value, key) => {
            return (
              <option  key={key} value={value.value}>
                {value.label}
              </option>
            );
          })}
        </Input>
      </FormGroup>
    );
  }
}
