import React from 'react'
import FormGroup from './FormGroup'
import Input from './Input'

export default props => (
    <FormGroup {...props}>
        <label for={`${props.id}`}>{props.label}</label>
        <Input 
              {...props}
              type={props.type}
              value={props.value}
              id={props.id}
        />
    </FormGroup>
)
