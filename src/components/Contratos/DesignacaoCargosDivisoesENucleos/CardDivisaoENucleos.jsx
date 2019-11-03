import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CoadAccordion from "../../Global/CoadAccordion";
import { CoadTabs } from "../../../components/Contratos/CoadTabs";
import { Row, Col } from "reactstrap";
import DesignacaoCargosDivisao, {} from "./DesignacaoCargosDivisao"
import {DesignacaoCargosNucleos} from './DesignacaoCargosNucleos'

export class CargosDivisao extends Component {

    static propTypes = {
        divisao: PropTypes.object.isRequired

    }

    render() {

        return (
            <CoadAccordion titulo={this.props.divisao.sigla}>
      
            <CoadTabs
                    titulo1={"Diretor(a) da Divisão e Suplente"}
                    titulo2={"Núcleos da Divisão"}
                    conteudo1={
                    <div>
                        <Row>
                        <Col sm="12">
                            <DesignacaoCargosDivisao divisao={this.props.divisao}/>
                        </Col>
                        </Row>
                    </div>
                    }
                    conteudo2={
                    <div>
                        <Row>
                        <Col sm="12">
                            <DesignacaoCargosNucleos divisao={this.props.divisao}/>
                        </Col>
                        </Row>
                    </div>
                    }
                />

            </CoadAccordion>
        )
    }
}

