import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../service/auth.service";
import "./style.scss";
import logoPrincipal from "../../assets/images/logoSGC.svg";
import ajuda from "../../assets/images/bt-ajuda.svg";
import notificacao from "../../assets/images/bt-notification.svg";
import gestor from "../../assets/images/bt-gestor.svg";
import sair from "../../assets/images/bt-sair.svg";
import busca from "../../assets/images/bt-busca.svg";

export default class Topbar extends Component {
  HandleLogout = () => {
    logout();
  };

  render() {
    const { HandleLogout } = this.props;
    return (
      <div className="position-fixed fixed-top w-100">
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <div className="logo-principal d-sm-flex align-items-center justify-content-center">
            <img src={logoPrincipal} alt="Logo Principal" />
          </div>
          {/* <!-- Sidebar Toggle (Topbar) --> */}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>

          {/* <!-- Topbar Search --> */}
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 w-50 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control coad-bg-light border-0 small input-height"
                placeholder="Buscando por..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append coad-bg-light rounded">
                <button className="btn btn-link pl-2" type="button">
                  {/* <i className="fas fa-lg fa-chevron-circle-down"></i> */}
                  <img height="25" src={busca} alt="Buscar" />
                </button>
              </div>
            </div>
          </form>

          {/* <!-- Topbar Navbar --> */}
          <ul className="navbar-nav ml-auto">
            {/* <!-- Nav Item - Alerts --> */}
            <li className="nav-item dropdown no-arrow mx-2">
              <NavLink className="nav-link dropdown-toggle coad-height-bt mt-4">
                {/* <i className="fas fa-question"></i> */}
                <img src={ajuda} alt="Ajuda" />
              </NavLink>
              <p className="coad-text-sm d-flex justify-content-center align-items-center">Ajuda</p>
            </li>
            <li className="nav-item dropdown no-arrow mx-2">
              <NavLink className="nav-link dropdown-toggle coad-height-bt mt-4">
                <img src={notificacao} alt="Notificações" />
                {/* <span className="badge badge-danger badge-counter">3+</span> */}
              </NavLink>
              <p className="coad-text-sm">Notificações</p>
            </li>
            <li className="nav-item dropdown no-arrow mx-2">
              <NavLink className="nav-link dropdown-toggle coad-height-bt mt-4">
                <img src={gestor} alt="Gestor" />
              </NavLink>
              <p className="coad-text-sm d-flex justify-content-center align-items-center">Gestor</p>
            </li>
            <li className="nav-item dropdown no-arrow mx-2">
              <NavLink
                to="#sair"
                onClick={this.HandleLogout}
                className="nav-link dropdown-toggle coad-height-bt mt-4"
              >
                <img src={sair} alt="Sair" />
              </NavLink>
              <p className="coad-text-sm d-flex justify-content-center align-items-center">Sair</p>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
