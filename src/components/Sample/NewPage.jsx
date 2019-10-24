import React from 'react'

export default props => (
    <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        {props.children}
                    </div>
                </div>
            </div>
)