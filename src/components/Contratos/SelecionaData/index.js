import React, { Component } from "react";
import { Calendar } from "primereact/calendar";
import { CALENDAR_PT } from "../../../configs/config.constants";
import { addLocale } from "primereact/api";

export class SelecionaData extends Component {
  constructor() {
    super();
    this.state = {};
    addLocale("pt", CALENDAR_PT);
  }

  setaData(event) {
    this.props.onSelect(event.value);
  }

  render() {
    return (
      <Calendar
        {...this.props}
        value={this.props.data}
        onChange={event => this.setaData(event)}
        minDate={this.props.minDate ? new Date(this.props.minDate.value) : null}
        maxDate={this.props.maxDate ? new Date(this.props.maxDate.value) : null}
        readOnlyInput
        locale="pt"
        dateFormat="dd/mm/yy"
        showIcon={true}
        placeholder={this.props.placeholder}
        showButtonBar={true}
      />
    );
  }
}
