import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {BuscaIncrementalServidores} from "../BuscaIncrementalServidores"
import {Button} from 'primereact/button';
import {updateCargosDivisao} from '../../../service/Cargos.service'

export default class DesignacaoCargosDivisao extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            diretor: props.divisao ? props.divisao.diretor : null,
            suplente: props.divisao ? props.divisao.suplente_diretor : null,
        }
    }
    
    static propTypes = {
        divisao: PropTypes.object.isRequired

    }

    updateDiretor(diretor) {
        this.setState({diretor})
    }

    updateSuplente(suplente) {
        this.setState({suplente})
    }

    updateCargos() {
        console.log('Atualiza :', this.state.suplente)
        updateCargosDivisao(this.props.divisao.uuid, this.state.diretor, this.state.suplente)
    }

    render() {
        return (
            <div>
                    <div className="p-grid p-fluid">
                        <div className="p-grid">
                            <div className="p-col-12 teste" >
                                <h6>Diretor(a)</h6>
                                <BuscaIncrementalServidores 
                                    userName={this.state.diretor ? this.state.diretor.username : ''}
                                    onUpdate={(servidor) => this.updateDiretor(servidor)}
                                    placeholder="Selecione o diretor..."
                                />
                            </div>

                            <div className="p-col-12" >
                                <h6>Suplente</h6>
                                <BuscaIncrementalServidores 
                                    userName={this.state.suplente ? this.state.suplente.username : ''}
                                    onUpdate={(servidor) => this.updateSuplente(servidor)}
                                    placeholder="Selecione o suplente..."
                                />
                            </div>

                        </div>
                    </div>
                    <span className="float-right">
                        <Button 
                            label="Cancelar"
                            onClick={(e) => this.setState({userName: "admin"})}
                            className="p-button-secondary"
                        />
                        <Button 
                            type="link"
                            label="Aplicar"
                            onClick={(e) => this.updateCargos()}  
                        />
                    </span>

            </div>
        )
    }
}
