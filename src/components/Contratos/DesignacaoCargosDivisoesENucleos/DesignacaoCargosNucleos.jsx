import React, { Component } from "react";
import PropTypes from "prop-types";
import CoadAccordion from "../../Global/CoadAccordion";
import { getNucleosDaDivisao } from "../../../service/Divisoes.service";
import { DesignacaoCargosNucleo } from "./DesignacaoCargosNucleo";

export class DesignacaoCargosNucleos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nucleos: [],
    };
  }

  static propTypes = {
    divisao: PropTypes.array.isRequired,
  };

  async componentDidMount() {
    const nucleos = this.props.divisao
      ? await getNucleosDaDivisao(this.props.divisao.uuid)
      : [];
    this.setState({ nucleos });
  }

  render() {
    const { nucleos } = this.state;

    return (
      <div>
        {nucleos &&
          nucleos.map((nucleo, i) => {
            return (
              <CoadAccordion
                key={i}
                titulo={nucleo.sigla + " - " + nucleo.nome}
              >
                <DesignacaoCargosNucleo
                  nucleo={nucleo}
                  showMessage={this.props.showMessage}
                />
              </CoadAccordion>
            );
          })}
      </div>
    );
  }
}
