import React, { Component } from 'react'
import {Dropdown} from 'primereact/dropdown';
import { getTiposServicoLookup } from '../../../service/TiposServico.service';

export class SelecionaTipoServico extends Component {
    constructor() {
        super();
        this.state = {
            tiposServico: [],
            tipoServicoSelecionado: null,
        };
    }

    async componentDidMount(){
        const tiposServico = await getTiposServicoLookup()
        this.setState({tiposServico})
    }

    selecionaTipoServico(event) {
        this.setState({tipoServicoSelecionado: event.value})
        this.props.onSelect(event.value)
    }

    render() {
        return (
            <Dropdown 
                optionLabel="nome"
                options={this.state.tiposServico} 
                value={this.state.tipoServicoSelecionado} 
                onChange={event => this.selecionaTipoServico(event)} 
                autoWidth={false} 
                placeholder="Selecione um Tipo de Serviço..."
                showClear={true}
            />
        );
    }
}
