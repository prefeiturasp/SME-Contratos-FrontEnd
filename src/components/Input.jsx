import React from 'react'

export default props => (
    <input 
          {...props}
          type={props.type} 
          className={`form-control ${props.classe}`}
          id={props.id}
          placeholder={props.placeholder}
          value={props.valor}
          readOnly={props.readOnly}
          disabled={props.disabled}
          >
    </input>
)