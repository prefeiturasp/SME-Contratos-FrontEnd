import React from 'react'

export default props => (
    <div className={`form-group ${props.classe}`}>
        {props.children}
    </div>
)