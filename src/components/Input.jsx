import React from 'react'
import PropTypes from 'prop-types'

export const Input = props => {
    const {type,classe, placeholder, valor, readOnly, disabled, id} = props
   return (<input 
          {...props}
          type={type} 
          className={`form-control ${classe}`}
          id={id}
          placeholder={placeholder}
          value={valor}
          readOnly={readOnly}
          disabled={disabled}
          >
    </input>
   )}

Input.propTypes = {
    name: PropTypes.string,
    classe: PropTypes.string,
}

Input.defaultProps = {
    readOnly: false, 
    classe: ""
}