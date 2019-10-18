import React, { Component } from 'react';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';

import { SelecionaEmpresa } from '../SelecionaEmpresa'
import { SelecionaSituacaoContrato } from '../SelecionaSituacaoContrato'
import { SelecionaEstadoContrato } from '../SelecionaEstadoContrato'
import { SelecionaEquipamento } from '../SelecionaEquipamento'
import { SelecionaTipoServico } from '../SelecionaTipoServico'
import { SelecionaGestor } from '../SelecionaGestor'
import { SelecionaPeriodoEncerramentoContrato } from '../SelecionaPeriodoEncerramentoContrato'

import './style.scss'

export class BuscaContratosForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            empresa_contratada: '',
            situacao: '',
            estado_contrato: '',
            equipamento: '',
            encerramento_de: '',
            encerramento_ate: '',
            gestor: '',
            termo_contrato: '',
            tipo_servico: ''
       }
    }
    
    componentDidMount(){
        // this.setState({countriesData: this.countryService.getCountries(this)})
    }

    setaEmpresa(empresa) {
        this.setState({empresa_contratada: empresa.id})
    }

    setaSituacao(situacao) {
        this.setState({situacao: situacao.id})
    }
   
    setaEstado(estado) {
        this.setState({estado_contrato: estado.id})
    }
   
    setaEquipamento(equipamento) {
        this.setState({equipamento: equipamento.id})
    }
   
    setaTipoServico(tipoServico) {
        this.setState({tipo_servico: tipoServico.id})
    }

    setaGestor(gestor) {
        this.setState({gestor: gestor.id})
    }

    setaRangeDataEncerramento(rangeDataEncerramento) {
        if (rangeDataEncerramento[0]) {
            this.setState({encerramento_de: rangeDataEncerramento[0].toISOString().slice(0,10)})
        }
        if (rangeDataEncerramento[1]) {
            this.setState({encerramento_ate: rangeDataEncerramento[1].toISOString().slice(0,10)})
        }
    }
   
    handleClickBuscar() {
        this.props.onBuscarClick(this.state)
    }


    render() {
        const footer = <span>
                            <Button label="Buscar" style={{marginRight: '.25em'}} onClick={this.handleClickBuscar.bind(this)}/>
                        </span>;

        return (
            <Card footer={footer} className='filtro'>
            <div className="p-grid p-fluid">
                <div className="card card-w-title coad-card-filtro">

                    <div className="p-grid">

                        <div className="p-col-12">
                            <SelecionaEmpresa onSelect={this.setaEmpresa.bind(this)}/>
                        </div>

                        <div className="p-col-6">
                            <SelecionaSituacaoContrato onSelect={this.setaSituacao.bind(this)}/>
                        </div>

                        <div className="p-col-6">
                            <SelecionaEstadoContrato onSelect={this.setaEstado.bind(this)}/>
                        </div>

                        <div className="p-col-6">
                            <SelecionaEquipamento onSelect={this.setaEquipamento.bind(this)}/>
                        </div>

                        <div className="p-col-6 ">
                            <SelecionaTipoServico onSelect={this.setaTipoServico.bind(this)}/>
                        </div>

                        <div className="p-col-6 ">
                            <SelecionaGestor onSelect={this.setaGestor.bind(this)}/>
                        </div>


                        <div className="p-col-6">
                            <SelecionaPeriodoEncerramentoContrato onSelect={this.setaRangeDataEncerramento.bind(this)}/>
                        </div>

                        <div className="p-col-6">
                            <InputText 
                                value={this.state.termo_contrato} 
                                onChange={(e) => this.setState({termo_contrato: e.target.value})}
                                placeholder="Termo de Contrato"
                            />
                        </div>


                    </div>
                </div>
            </div>
            </Card>

        );
    }
}