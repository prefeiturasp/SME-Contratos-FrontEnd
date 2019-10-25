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
                        <BuscaIncrementalServidores 
                            userName={this.state.userName}
                            onUpdate={(servidor) => this.updateUsername(servidor)}
                        />    
                    </AccordionTab>
                </Accordion>
                <Button 
                    label="Teste Admin"
                    onClick={(e) => this.setState({userName: "admin"})}  
                />
                <Button 
                    label="Teste Ana"
                    onClick={(e) => this.setState({userName: "000003"})}  
                />
            </div>
        )
    }
}
