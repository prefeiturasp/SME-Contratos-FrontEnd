import React from "react";

import { FormGroup, Label, Input } from "reactstrap";
import PropTypes from 'prop-types'

export const InputLabel = props => {
    const {id, label, value, type, name, readOnly, classe} = props
  return (
    <FormGroup>
      <Label for={`${id}`}>{label}</Label>
      <Input {...props} className={`form-group ${classe}`} type={type} valor={value} id={id} name={name}  readOnly={readOnly} />
    </FormGroup>
  );
};

Input.propTypes = {
    name: PropTypes.string,
}

Input.defaultProps = {
    readOnly: false, 
    classe: ""
}