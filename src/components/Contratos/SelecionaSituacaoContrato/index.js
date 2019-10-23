import React, { Component } from 'react'
import {Dropdown} from 'primereact/dropdown';
import {getSituacoesContrato} from '../../../service/Contratos.service'

export class SelecionaSituacaoContrato extends Component {
    constructor() {
        super();
        this.state = {
            situacoes: [],
            situacaoSelecionada: null,
        };
    }

    async componentDidMount(){
        const situacoes = await getSituacoesContrato()
        this.setState({situacoes})
    }

    selecionaSituacao(event) {
        this.setState({situacaoSelecionada: event.value})
        this.props.onSelect(event.value)
    }

    render() {
        return (
            <Dropdown 
                optionLabel="nome"
                options={this.state.situacoes} 
                value={this.state.situacaoSelecionada} 
                onChange={event => this.selecionaSituacao(event)} 
                autoWidth={false} 
                placeholder="Selecione uma Situação..."
                showClear={true}
            />
        );
    }
}
