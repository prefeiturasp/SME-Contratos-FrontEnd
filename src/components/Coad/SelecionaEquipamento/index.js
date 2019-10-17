import React, { Component } from 'react'
import {Dropdown} from 'primereact/dropdown';


export class SelecionaEquipamento extends Component {
    constructor() {
        super();
        this.state = {
            equipamentos: [
                {nome: 'Unidades Educacionais', id: 'UE'},
                {nome: 'Unidades Administrativas', id: 'UA'},
                {nome: 'Centros Educacionais Unificados', id: 'CEU'}
            ],
            equipamentoSelecionado: null,
        };
    }


    selecionaEquipamento(event) {
        this.setState({equipamentoSelecionado: event.value})
        this.props.onSelect(event.value)
    }

    render() {
        return (
            <Dropdown 
                optionLabel="nome"
                options={this.state.equipamentos} 
                value={this.state.equipamentoSelecionado} 
                onChange={event => this.selecionaEquipamento(event)} 
                autoWidth={false} 
                placeholder="Selecione um Equipamento..."
            />
        );
    }
}
