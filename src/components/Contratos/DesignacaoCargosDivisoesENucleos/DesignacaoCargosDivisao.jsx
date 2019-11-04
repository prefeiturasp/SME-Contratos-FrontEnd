import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {BuscaIncrementalServidores} from "../BuscaIncrementalServidores"
import {Button} from 'primereact/button';
import { Messages } from "primereact/messages";
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
        updateCargosDivisao(this.props.divisao.uuid, this.state.diretor, this.state.suplente)

        this.messages.show({
            severity: "success",
            life: 5000,
            detail:
              "Alterações realizadas com sucesso."
          });
    }

    cancelUpdateCargos() {
        this.resetCargos()

        this.messages.show({
            severity: "warn",
            life: 5000,
            detail:
              "Edições descartadas."
          });
    }

    resetCargos() {
        const diretor = this.props.divisao ? this.props.divisao.diretor : null
        const suplente = this.props.divisao ? this.props.divisao.suplente_diretor : null
        this.setState({
            diretor,
            suplente
        })
    }

    render() {
        return (
            <div>
                    <div className="p-grid p-fluid">
                        <div className="p-grid">
                            <div className="p-col-12" >
                                <Messages ref={el => (this.messages = el)}></Messages>
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
                            onClick={(e) => this.cancelUpdateCargos()}
                            className="btn-coad-background-outline"
                            style={{ marginRight: ".25em" }}
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
