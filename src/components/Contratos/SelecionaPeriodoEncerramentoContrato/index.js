import React, { Component } from 'react'
import {Calendar} from 'primereact/calendar';


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
        const pt = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
            dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
            dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
            monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
            monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
            clear: 'Limpar',
            today: 'Hoje',
        };

        return (
            <Calendar 
                value={this.state.rangeDataEncerramento} 
                onChange={event => this.setaRangeEncerramento(event)}  
                selectionMode="range" 
                readonlyInput={true}
                locale={pt}
                dateFormat="dd/mm/yy"
                showIcon={true}
                placeholder="Selecione um período de encerramento..."
                showButtonBar={true}
            />
        );
    }
}
