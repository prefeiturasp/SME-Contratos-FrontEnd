import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {BuscaIncrementalServidores} from "../BuscaIncrementalServidores"
import {Button} from 'primereact/button';
import { Button as AntButton } from 'antd';
import {updateCargosNucleo, getServidoresNucleo, updateServidoresNucleo} from '../../../service/Cargos.service'

export class DesignacaoCargosNucleo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            chefe: props.nucleo ? props.nucleo.chefe : null,
            suplente: props.nucleo ? props.nucleo.suplente_chefe : null,
            servidores: [],
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

    updateServidor(servidor, idx) {
        let servidores = this.state.servidores
        servidores[idx].servidor = servidor
        this.setState({servidores})
    }

    limpaServidoresVazios() {
        const servidores = this.state.servidores.filter(
            (servidor) => {
                return servidor.servidor.username !== ''
            }
        )

        this.setState({servidores})
    }


    updateCargos() {
        this.limpaServidoresVazios()
        updateCargosNucleo(this.props.nucleo.uuid, this.state.chefe, this.state.suplente)
        updateServidoresNucleo(this.props.nucleo.uuid, this.state.servidores)
    }

    async resetCargos() {
        const chefe = this.props.nucleo ? this.props.nucleo.chefe : null
        const suplente = this.props.nucleo ? this.props.nucleo.suplente_chefe : null
        const servidores = this.props.nucleo ? await getServidoresNucleo(this.props.nucleo.uuid) : []

        this.setState({
            chefe,
            suplente,
            servidores
        })

    }

    componentDidMount() {
        this.resetCargos()
    }

    removeServidor(idx) {
        const servidores = this.state.servidores
        servidores.splice(idx, 1)
        this.setState({servidores})
    }

    appendServidor() {
        const nucleo = this.props.nucleo ? this.props.nucleo.id : null
        const emptyServidor = {
            nucleo: nucleo,
            id: null,
            servidor: {
                username: '',
            }
        }

        const servidores = this.state.servidores
        
        servidores.push(emptyServidor)

        this.setState(servidores)

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

                            {this.state.servidores.map(
                                (servidor, idx) => {
                                    return (
                                        <div className="p-grid p-col-12">   
                                            <div className="p-col-10">
                                                <h6>Servidor</h6>
                                                <BuscaIncrementalServidores
                                                    key={servidor.id}
                                                    userName={servidor.servidor ? servidor.servidor.username : ''}
                                                    onUpdate={(servidor) => this.updateServidor(servidor, idx)}
                                                    placeholder="Selecione o servidor..."
                                                />
                                            </div>
                                            <div className="p-col-2">
                                                <Button 
                                                    style={{marginTop: '28px'}}
                                                    label="Remover"
                                                    onClick={(e) => this.removeServidor(idx)}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            )}

                            <div className="p-col-12" style={{padding: '0px'}} >
                                <AntButton 
                                    type="link" 
                                    size="small"
                                    onClick={(e) => this.appendServidor()}
                                >
                                    Adicionar Servidor
                                </AntButton>
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
