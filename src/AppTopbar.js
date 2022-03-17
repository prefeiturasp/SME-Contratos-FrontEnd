import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";
import { logout } from "./service/auth.service";

export class AppTopbar extends Component {
  static defaultProps = {
    onToggleMenu: null,
  };

  static propTypes = {
    onToggleMenu: PropTypes.func.isRequired,
  };

  handleLogout = () => {
    logout();
  };
  render() {
    return (
      <div className="layout-topbar clearfix">
        <button
          className="p-link layout-menu-button"
          onClick={this.props.onToggleMenu}
        >
          <span className="pi pi-bars" />
        </button>
        <div className="layout-topbar-icons">
          <span className="layout-topbar-search">
            <InputText type="text" placeholder="Search" />
            <span className="layout-topbar-search-icon pi pi-search" />
          </span>
          <button className="p-link" title="Ajuda">
            <span className="layout-topbar-icon pi pi-question" />
            <span className="layout-topbar-item-text">Ajuda</span>
          </button>
          <button className="p-link" title="Notificações">
            <span className="layout-topbar-item-text">Notificações</span>
            <span className="layout-topbar-icon pi pi-bell" />
            <span className="layout-topbar-badge">5</span>
          </button>
          <button className="p-link" title="Gestor">
            <span className="layout-topbar-item-text">Gestor</span>
            <span className="layout-topbar-icon pi pi-user" />
          </button>
          <button
            className="p-link"
            title="Sair"
            onClick={() => this.handleLogout()}
          >
            <span className="layout-topbar-item-text">Sair</span>
            <span className="layout-topbar-icon pi pi-power-off" />
          </button>
        </div>
      </div>
    );
  }
}
