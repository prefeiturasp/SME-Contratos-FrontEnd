import React, { Component } from 'react'
import CoadAccordion from "../../../components/Global/CoadAccordion";
import { getDivisoes } from '../../../service/Divisoes.service'

export default class DesignacaoCargosDivisoes extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             divisoes: []
        }
    }
    
    async componentDidMount() {
        const divisoes = await getDivisoes()

        this.setState({divisoes})
    }
    

    render() {
        const {divisoes} = this.state

        return (
            <div>
                {divisoes && divisoes.map(
                    (divisao) => {
                        return (
                            <CoadAccordion titulo={divisao.sigla}>
                                <p> teste teste teste teste teste </p>
                            </CoadAccordion>
                        )
                    }
                )}
                
            </div>
        )
    }
}
