import React, { Component } from "react";
import { getDivisoes } from "../../../service/Divisoes.service";
import { CargosDivisao } from "./CardDivisaoENucleos";

export default class DesignacaoCargosDivisoes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      divisoes: [],
    };
  }

  async componentDidMount() {
    const divisoes = await getDivisoes();

    this.setState({ divisoes });
  }

  render() {
    const { divisoes } = this.state;

    return (
      <div>
        {divisoes &&
          divisoes.map(divisao => {
            return (
              <CargosDivisao
                divisao={divisao}
                showMessage={this.props.showMessage}
              ></CargosDivisao>
            );
          })}
      </div>
    );
  }
}
