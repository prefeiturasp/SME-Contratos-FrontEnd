import React, { Component } from 'react'
import {Calendar} from 'primereact/calendar';
import { CALENDAR_PT } from '../../../configs/config.constants'


export class SelecionaDataContrato extends Component {
    constructor() {
        super();
        this.state = {};
    }


    setaData(event) {
        this.props.onSelect(event.value)
    }

    render() {
           return (
            <Calendar 
                value={this.props.data} 
                onChange={event => this.setaData(event)} 
                minDate={new Date(this.props.minDate)}
                maxDate={new Date(this.props.maxDate)}
                locale={CALENDAR_PT}
                dateFormat="dd/mm/yy"
                showIcon={true}
                placeholder={this.props.tipo}
                showButtonBar={true}
            />
        );
    }
}
