import React, { Component } from 'react'
import {Calendar} from 'primereact/calendar';
import { CALENDAR_PT } from '../../../configs/config.constants'


export class SelecionaPeriodoEncerramentoContrato extends Component {
    constructor() {
        super();
        this.state = {
            rangeDataEncerramento: null,
        };
    }


    setaRangeEncerramento(event) {
        this.setState({rangeDataEncerramento: event.value})
        this.props.onSelect(event.value)
    }

    render() {
           return (
            <Calendar 
                value={this.state.rangeDataEncerramento} 
                onChange={event => this.setaRangeEncerramento(event)}  
                selectionMode="range" 
                readonlyInput={true}
                locale={CALENDAR_PT}
                dateFormat="dd/mm/yy"
                showIcon={true}
                placeholder="Selecione um período de encerramento..."
                showButtonBar={true}
            />
        );
    }
}
