import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CoadAccordion from "../../Global/CoadAccordion";
import { TabView, TabPanel } from "primereact/tabview";
import DesignacaoCargosDivisao, {} from "./DesignacaoCargosDivisao"
import {DesignacaoCargosNucleos} from './DesignacaoCargosNucleos'

export class CargosDivisao extends Component {

    static propTypes = {
        divisao: PropTypes.object.isRequired

    }

    render() {

        return (
            <CoadAccordion titulo={this.props.divisao.sigla}>
      
                <TabView>
                    <TabPanel header="Diretor(a) da Divisão e Suplente">
                        <DesignacaoCargosDivisao divisao={this.props.divisao}/>
                    </TabPanel>
                    <TabPanel header="Núcleos da Divisão">
                        <DesignacaoCargosNucleos divisao={this.props.divisao}/>
                    </TabPanel>
                </TabView>

            </CoadAccordion>
        )
    }
}

