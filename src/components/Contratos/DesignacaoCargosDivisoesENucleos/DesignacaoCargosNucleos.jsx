import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'antd';
import {getNucleosDaDivisao} from '../../../service/Divisoes.service'
import {DesignacaoCargosNucleo} from './DesignacaoCargosNucleo'

export class DesignacaoCargosNucleos extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             nucleos: []
        }
    }
    
    static propTypes = {
        divisao: PropTypes.array.isRequired

    }
    
    async componentDidMount() {
        const nucleos = this.props.divisao ? await getNucleosDaDivisao(this.props.divisao.uuid) : []
        this.setState({nucleos})
    }
    

    render() {
        const { Panel } = Collapse;
        const {nucleos} = this.state

        return (
            <div>
                <Collapse accordion expandIconPosition="right">
                {nucleos && nucleos.map(
                    (nucleo) => {
                        return (
                            <Panel header={nucleo.nome} key={nucleo.uuid}>
                                <DesignacaoCargosNucleo nucleo={nucleo}/>
                                {/* <p>{nucleo.chefe ? nucleo.chefe.nome : "Chefe não definido"}</p>
                                <p>{nucleo.suplente_chefe ? nucleo.suplente_chefe.nome : "Suplente não definido"}</p> */}
                            </Panel>
                        )
                    }
                )}
                </Collapse>
                
            </div>
        )

    }
}
