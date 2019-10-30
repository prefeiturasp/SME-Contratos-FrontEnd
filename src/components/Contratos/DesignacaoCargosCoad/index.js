import React, { Component } from 'react'
import CoadAccordion from "../../../components/Global/CoadAccordion";
import {Button} from 'primereact/button';
import {BuscaIncrementalServidores} from "../BuscaIncrementalServidores"
import {getCargosCoad, updateCoordenadorCoad, updateAssessoresCoad} from '../../../service/Cargos.service'

export default class DesignacaoCargosCoad extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            cargosCoad: null,
            coordenador: null,
            assessores: [],
            userName: null
        }
    }

    async componentDidMount() {
        const cargosCoad = await getCargosCoad()
        this.setState(
            {
                cargosCoad,
                coordenador: cargosCoad.coordenador,
                assessores: cargosCoad.assessores
            }
        )

    }
    

    updateUsername(servidor) {
        this.setState({userName: servidor.username})
    }

    updateCoordenador(coordenador) {
        this.setState({coordenador})
    }

    updateAssessor(assessor, idx) {
        let assessores = this.state.assessores
        assessores[idx].assessor = assessor
        this.setState({assessores})
    }


    updateCargosCoad() {
        updateCoordenadorCoad(this.state.coordenador)
        updateAssessoresCoad(this.state.assessores)
    }

    removeAssessor(idx) {
        const assessores = this.state.assessores
        assessores.splice(idx, 1)
        this.setState({assessores})
    }
    
    render() {
        return (
            <div>
                <CoadAccordion titulo={"COAD"}>
                    <div className="p-grid p-fluid">
                        <div className="p-grid">
                            <div className="p-col-12" >
                            <h6>Coordenador</h6>
                                <BuscaIncrementalServidores 
                                    userName={this.state.coordenador ? this.state.coordenador.username : ''}
                                    onUpdate={(servidor) => this.updateCoordenador(servidor)}
                                    placeholder="Selecione o coordenador..."
                                />
                            </div>

                            {this.state.assessores.map(
                                (assessor, idx) => {
                                    return (
                                        <div className="p-grid p-col-12">   
                                        <div className="p-col-10">
                                            <h6>Assessor do Coordenador</h6>
                                            <BuscaIncrementalServidores
                                                key={assessor.id}
                                                userName={assessor.assessor.username}
                                                onUpdate={(servidor) => this.updateAssessor(servidor, idx)}
                                                placeholder="Selecione o assessor do coordenador..."
                                            />
                                        </div>
                                        <div className="p-col-2">
                                            <Button 
                                                 style={{marginTop: '28px'}}
                                                label="Remover"
                                                onClick={(e) => this.removeAssessor(idx)}
                                            />
                                        </div>
                                        </div>
                                    )
                                }
                            )}

                            <div className="p-col-6">
                                <Button 
                                    label="Cancelar"
                                    onClick={(e) => this.setState({userName: "admin"})}
                                    className="p-button-secondary"
                                />
                            </div>
                            <div className="p-col-6">
                                <Button 
                                    label="Aplicar"
                                    onClick={(e) => this.updateCargosCoad()}  
                                />
                            </div>
                        </div>
                    </div>
                </CoadAccordion>
            </div>
        )
    }
}
