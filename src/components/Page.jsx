import React from 'react'
import Sidebar from './Sidebar';
import Topbar from './Topbar/Topbar';
const style = {display: 'inline'}
export default props => (
    <div>
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-colum">
                <div id="content">
                    <Topbar />
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">{props.titulo}</h1>
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top" style={style}>
            <i className="fas fa-angle-up"></i>
        </a>
    </div>
)