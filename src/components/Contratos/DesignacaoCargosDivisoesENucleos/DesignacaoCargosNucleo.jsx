import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {BuscaIncrementalServidores} from "../BuscaIncrementalServidores"
import {Button} from 'primereact/button';
import {updateCargosNucleo} from '../../../service/Cargos.service'

export class DesignacaoCargosNucleo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            chefe: props.nucleo ? props.nucleo.chefe : null,
            suplente: props.nucleo ? props.nucleo.suplente_chefe : null,
        }
    }
    
    static propTypes = {
        nucleo: PropTypes.object.isRequired

    }

    updateChefe(chefe) {
        this.setState({chefe})
    }

    updateSuplente(suplente) {
        this.setState({suplente})
    }

    updateCargos() {
        updateCargosNucleo(this.props.nucleo.uuid, this.state.chefe, this.state.suplente)
    }

    resetCargos() {
        const chefe = this.props.nucleo ? this.props.nucleo.chefe : null
        const suplente = this.props.nucleo ? this.props.nucleo.suplente_chefe : null

        this.setState({
            chefe,
            suplente
        })

    }

    render() {
        return (
            <div>
                    <div className="p-grid p-fluid">
                        <div className="p-grid">
                            <div className="p-col-12 teste" >
                                <h6>Chefe</h6>
                                <BuscaIncrementalServidores 
                                    userName={this.state.chefe ? this.state.chefe.username : ''}
                                    onUpdate={(servidor) => this.updateChefe(servidor)}
                                    placeholder="Selecione o chefe..."
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
                            onClick={(e) => this.resetCargos()}
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
