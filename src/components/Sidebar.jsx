import React from 'react'

export default props => (
    <div>
    <ul className="navbar-nav bg-coad-sidebar sidebar sidebar-dark accordion" id="accordionSidebar">

      {/* <!-- Sidebar - Brand --> */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">COAD <sup>2019</sup></div>
      </a>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0"/>

      {/* <!-- Nav Item - Dashboard --> */}
      {/* <li className="nav-item active">
        <a className="nav-link" href="#home">
          <i className="fas fa-fw fa-book-reader"></i>
          <span className="span-coad-menu">Dashboard</span></a>
      </li> */}

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div className="sidebar-heading"></div>

      {/* <!-- Nav Item - Pages Collapse Menu --> */}
      <li className="nav-item">
        <a className="nav-link nav-link-coad collapsed" href="#teste" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-book-reader coad-icon-sm"></i>
          <span className="span-coad-menu">Visualizar Contratos</span>
        </a>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Components:</h6>
            <a className="collapse-item" href="#teste">Buttons</a>
            <a className="collapse-item" href="#teste">Cards</a>
          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Utilities Collapse Menu --> */}
      <li className="nav-item">
        <a className="nav-link nav-link-coad collapsed" href="#teste" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
          <i className="fas coad-icon-sm fa-book-reader"></i>
          <span className="span-coad-menu">Planejamento</span>
        </a>
        <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Utilities:</h6>
            <a className="collapse-item" href="#teste">Colors</a>
            <a className="collapse-item" href="#teste">Borders</a>
            <a className="collapse-item" href="#teste">Animations</a>
            <a className="collapse-item" href="#teste">Other</a>
          </div>
        </div>
      </li>

        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
        <li className="nav-item">
        <a className="nav-link nav-link-coad collapsed" href="#teste" data-toggle="collapse" data-target="#collapseUtilities1" aria-expanded="true" aria-controls="collapseUtilities1">
          <i className="fas coad-icon-sm fa-book-reader"></i>
          <span className="span-coad-menu">Localizar gestores</span>
        </a>
        <div id="collapseUtilities1" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Utilities:</h6>
            <a className="collapse-item" href="#teste">Colors</a>
            <a className="collapse-item" href="#teste">Borders</a>
            <a className="collapse-item" href="#teste">Animations</a>
            <a className="collapse-item" href="#teste">Other</a>
          </div>
        </div>
      </li>

        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
        <li className="nav-item">
        <a className="nav-link nav-link-coad collapsed" href="#teste" data-toggle="collapse" data-target="#collapseUtilities2" aria-expanded="true" aria-controls="collapseUtilities2">
          <i className="fas coad-icon-sm fa-book-reader"></i>
          <span className="span-coad-menu">Relatórios</span>
        </a>
        <div id="collapseUtilities2" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Utilities:</h6>
            <a className="collapse-item" href="#teste">Colors</a>
            <a className="collapse-item" href="#teste">Borders</a>
            <a className="collapse-item" href="#teste">Animations</a>
            <a className="collapse-item" href="#teste">Other</a>
          </div>
        </div>
      </li>

        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
        <li className="nav-item">
        <a className="nav-link nav-link-coad collapsed" href="#teste" data-toggle="collapse" data-target="#collapseUtilities3" aria-expanded="true" aria-controls="collapseUtilities3">
          <i className="fas coad-icon-sm fa-book-reader"></i>
          <span className="span-coad-menu">Gestão</span>
        </a>
        <div id="collapseUtilities3" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Utilities:</h6>
            <a className="collapse-item" href="#teste">Colors</a>
            <a className="collapse-item" href="#teste">Borders</a>
            <a className="collapse-item" href="#teste">Animations</a>
            <a className="collapse-item" href="#teste">Other</a>
          </div>
        </div>
      </li>

        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
        <li className="nav-item">
        <a className="nav-link nav-link-coad collapsed" href="#teste" data-toggle="collapse" data-target="#collapseUtilities4" aria-expanded="true" aria-controls="collapseUtilities4">
          <i className="fas coad-icon-sm fa-book-reader"></i>
          <span className="span-coad-menu">Configurações</span>
        </a>
        <div id="collapseUtilities4" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Utilities:</h6>
            <a className="collapse-item" href="#teste">Colors</a>
            <a className="collapse-item" href="#teste">Borders</a>
            <a className="collapse-item" href="#teste">Animations</a>
            <a className="collapse-item" href="#teste">Other</a>
          </div>
        </div>
      </li>

      {/* <!-- Divider --> */}
      {/* <hr className="sidebar-divider" /> */}

    </ul>
    </div>
)