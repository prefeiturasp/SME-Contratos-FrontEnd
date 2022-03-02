import "./style.scss";
import React, { Component } from "react";
import foto from "../../assets/images/photo.svg";
import { NavLink } from "react-router-dom";
export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recolher: false,
    };
  }

  render() {
    const { recolher } = this.state;
    return (
      <div className="mt-5 pt-4">
        <ul
          className={`navbar-nav bg-coad-sidebar sidebar sidebar-dark accordion ${
            recolher ? "toggled" : ""
          }`}
          id="accordionSidebar"
        >
          <div className="d-flex align-items-center justify-content-end p-2 text-white">
            <button
              onClick={() => {
                this.setState({ recolher: !recolher });
              }}
              type="button"
              className="btn btn-link text-white"
            >
              <i
                className={`fas ${
                  recolher
                    ? "fa-chevron-circle-right"
                    : "fa-chevron-circle-left"
                }`}
              ></i>
            </button>
          </div>
          {/* <!-- Sidebar - Brand --> */}
          <NavLink
            className="sidebar-brand d-flex align-items-center justify-content-center coad-profile"
            to="#"
          >
            <div className="sidebar-brand-icon">
              <img
                src={foto}
                className="rounded-circle border-white coad-border"
                alt="Foto"
              ></img>
            </div>
          </NavLink>
          <div className="d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center coad-border-name border-white  w-75 p-1">
              <span className="text-white coad-text-sm">{`Nome ${
                recolher ? "" : "Sobrenome"
              }`}</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <NavLink to="#">
              <i className="fas fa-user-edit coad-icon-xs pr-1 text-white"></i>
              <span className="text-white coad-text-sm">Perfil</span>
            </NavLink>
          </div>
          {/* <!-- Heading --> */}
          <div className="sidebar-heading"></div>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link nav-link-coad pl-4 collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-book-reader coad-icon-sm"></i>
              <span className="span-coad-menu">Visualizar Contratos</span>
            </a>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Components:</h6>
                <a className="collapse-item" href="#teste">
                  Buttons
                </a>
                <a className="collapse-item" href="#teste">
                  Cards
                </a>
              </div>
            </div>
          </li>

          {/* <!-- Nav Item - Utilities Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link nav-link-coad pl-4 collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseUtilities"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <i className="fas coad-icon-sm fa-tasks"></i>
              <span className="span-coad-menu">Planejamento</span>
            </a>
            <div
              id="collapseUtilities"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <a className="collapse-item" href="#teste">
                  Colors
                </a>
                <a className="collapse-item" href="#teste">
                  Borders
                </a>
                <a className="collapse-item" href="#teste">
                  Animations
                </a>
                <a className="collapse-item" href="#teste">
                  Other
                </a>
              </div>
            </div>
          </li>

          {/* <!-- Nav Item - Utilities Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link nav-link-coad pl-4 collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseUtilities1"
              aria-expanded="true"
              aria-controls="collapseUtilities1"
            >
              <i className="fas coad-icon-sm fa-map-marker"></i>
              <span className="span-coad-menu">Localizar gestores</span>
            </a>
            <div
              id="collapseUtilities1"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <a className="collapse-item" href="#teste">
                  Colors
                </a>
                <a className="collapse-item" href="#teste">
                  Borders
                </a>
                <a className="collapse-item" href="#teste">
                  Animations
                </a>
                <a className="collapse-item" href="#teste">
                  Other
                </a>
              </div>
            </div>
          </li>

          {/* <!-- Nav Item - Utilities Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link nav-link-coad pl-4 collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseUtilities2"
              aria-expanded="true"
              aria-controls="collapseUtilities2"
            >
              <i className="fas coad-icon-sm fa-book-reader"></i>
              <span className="span-coad-menu">Relatórios</span>
            </a>
            <div
              id="collapseUtilities2"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <a className="collapse-item" href="#teste">
                  Colors
                </a>
                <a className="collapse-item" href="#teste">
                  Borders
                </a>
                <a className="collapse-item" href="#teste">
                  Animations
                </a>
                <a className="collapse-item" href="#teste">
                  Other
                </a>
              </div>
            </div>
          </li>

          {/* <!-- Nav Item - Utilities Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link nav-link-coad pl-4 collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseUtilities3"
              aria-expanded="true"
              aria-controls="collapseUtilities3"
            >
              <i className="fas coad-icon-sm fa-user-cog"></i>
              <span className="span-coad-menu">Gestão</span>
            </a>
            <div
              id="collapseUtilities3"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <a className="collapse-item" href="#teste">
                  Colors
                </a>
                <a className="collapse-item" href="#teste">
                  Borders
                </a>
                <a className="collapse-item" href="#teste">
                  Animations
                </a>
                <a className="collapse-item" href="#teste">
                  Other
                </a>
              </div>
            </div>
          </li>

          {/* <!-- Nav Item - Utilities Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link nav-link-coad pl-4 collapsed"
              href="#teste"
              data-toggle="collapse"
              data-target="#collapseUtilities4"
              aria-expanded="true"
              aria-controls="collapseUtilities4"
            >
              <i className="fas coad-icon-sm fa-cog"></i>
              <span className="span-coad-menu">Configurações</span>
            </a>
            <div
              id="collapseUtilities4"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <a className="collapse-item" href="#teste">
                  Colors
                </a>
                <a className="collapse-item" href="#teste">
                  Borders
                </a>
                <a className="collapse-item" href="#teste">
                  Animations
                </a>
                <a className="collapse-item" href="#teste">
                  Other
                </a>
              </div>
            </div>
          </li>
          <div
            className={`d-flex align-items-center justify-content-center ${
              recolher ? "sr-only" : ""
            }`}
          >
            <div className="mt-5 pt-5 w-75">
              <span className="coad-text-sm text-white">
                SME-SP-SGC - Distribuído sob a Licença AGPL V3
              </span>
            </div>
          </div>
        </ul>
      </div>
    );
  }
}
