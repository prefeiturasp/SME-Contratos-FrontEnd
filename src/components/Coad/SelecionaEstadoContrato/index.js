import React, { Component } from 'react'
import {Dropdown} from 'primereact/dropdown';
import {getEstadosContrato} from '../../../service/Contratos.service'

export class SelecionaEstadoContrato extends Component {
    constructor() {
        super();
        this.state = {
            estados: [],
            estadoSelecionado: null,
        };
    }

    async componentDidMount(){
        const estados = await getEstadosContrato()
        this.setState({estados})
    }

    selecionaEstado(event) {
        this.setState({estadoSelecionado: event.value})
        this.props.onSelect(event.value)
    }

    render() {
        return (
            <Dropdown 
                optionLabel="nome"
                options={this.state.estados} 
                value={this.state.estadoSelecionado} 
                onChange={event => this.selecionaEstado(event)} 
                autoWidth={false} 
                placeholder="Selecione um Estado..."
            />
        );
    }
}
