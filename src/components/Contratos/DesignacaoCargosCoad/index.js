import React, { Component } from 'react'
import { Accordion, AccordionTab } from "primereact/accordion";
import {Button} from 'primereact/button';
import {BuscaIncrementalServidores} from "../BuscaIncrementalServidores"

export default class DesignacaoCargosCoad extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             userName: null
        }
    }

    updateUsername(servidor) {
        this.setState({userName: servidor.username})
    }
    
    render() {
        return (
            <div>
                <Accordion>
                    <AccordionTab header="COAD">
                        <div className="p-grid p-fluid">
                            <div className="p-grid">
                                <div className="p-col-12" style={{ margin: '10px 0 0 0' }}>
                                <h6>Coordenador</h6>
                                    <BuscaIncrementalServidores 
                                        userName={this.state.userName}
                                        onUpdate={(servidor) => this.updateUsername(servidor)}
                                        placeholder="Selecione o coordenador..."
                                    />
                                </div>

                                <div className="p-col-12">
                                <h6>Assessor do Coordenador</h6>
                                    <BuscaIncrementalServidores 
                                        userName={this.state.userName}
                                        onUpdate={(servidor) => this.updateUsername(servidor)}
                                        placeholder="Selecione o assessor do coordenador..."
                                    />
                                </div>
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
                                        onClick={(e) => this.setState({userName: "000003"})}  
                                    />
                                </div>
                            </div>
                        </div>
                        
                        
                    </AccordionTab>
                </Accordion>
                
            </div>
        )
    }
}
