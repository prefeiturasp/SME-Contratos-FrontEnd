import React, { Component } from 'react'
import {AutoComplete} from 'primereact/autocomplete';
import {getUsuariosLookup, getUsuarioByUserName} from '../../../service/Usuarios.service'

export class BuscaIncrementalServidores extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            servidor_digitado: null,
            servidor: null,
            servidores: [],
            filteredServidores: null,
        }

        this.filterServidores = this.filterServidores.bind(this);
    }

    async updateServidorFromProps() {
        const servidor = (await getUsuarioByUserName(this.props.userName))
        console.log('A', servidor);
        
        this.setState({servidor})
    }
    
    async componentDidMount() {
        const servidores = await getUsuariosLookup()
        this.setState({servidores})

        this.updateServidorFromProps()
    }

    
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.userName !== this.props.userName) {
            this.updateServidorFromProps()
        }
    }
    
    updateServidor(servidor) {
        console.log('B: ', servidor);
        
        this.setState({servidor})
        this.props.onUpdate(servidor)
    }

    filterServidores(event) {
        setTimeout(() => {
            var results = this.state.servidores.filter((servidor) => {
                return servidor.nome.toLowerCase().startsWith(event.query.toLowerCase());
            });
            this.setState({ filteredServidores: results });
        }, 250);
    }

    render() {
        return (
            // <div>
                <AutoComplete 
                    value={this.state.servidor} 
                    suggestions={this.state.filteredServidores} 
                    completeMethod={this.filterServidores} 
                    field="nome"
                    size={40} 
                    placeholder={this.props.placeholder || "Servidor"} 
                    minLength={1} 
                    onChange={(e) => this.updateServidor(e.value)} 
                />
            // </div>
        )
    }
}

