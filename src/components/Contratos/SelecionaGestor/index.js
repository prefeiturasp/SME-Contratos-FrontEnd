import React, { Component } from 'react'
import {Dropdown} from 'primereact/dropdown';
import { getUsuariosLookup } from '../../../service/Usuarios.service';

export class SelecionaGestor extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: [],
            usuarioSelecionado: null,
        };
    }

    async componentDidMount(){
        const usuarios = await getUsuariosLookup()
        this.setState({usuarios})
    }

    selecionaUsuario(event) {
        this.setState({usuarioSelecionado: event.value})
        this.props.onSelect(event.value)
    }

    render() {
        return (
            <Dropdown 
                optionLabel="nome"
                options={this.state.usuarios} 
                value={this.state.usuarioSelecionado} 
                onChange={event => this.selecionaUsuario(event)} 
                autoWidth={false} 
                placeholder="Selecione um Gestor..."
                showClear={true}
            />
        );
    }
}
