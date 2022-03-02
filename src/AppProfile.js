import React, { Component } from "react";
import classNames from "classnames";
import { getMeuProfile } from "./service/Usuarios.service";
export class AppProfile extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      nomeUsuario: "",
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.setState({ expanded: !this.state.expanded });
    event.preventDefault();
  }

  async componentDidMount() {
    const profile = await getMeuProfile();
    const nomeUsuario = profile ? profile.nome : "";
    this.setState({ nomeUsuario });
  }

  render() {
    return (
      <div className="layout-profile mt-5">
        <div>
          <img src="assets/layout/images/profile.png" alt="" />
        </div>
        <button className="p-link layout-profile-link" onClick={this.onClick}>
          <span className="username">{this.state.nomeUsuario}</span>
          <i className="pi pi-fw pi-pencil" />
        </button>
        <ul
          className={classNames({
            "layout-profile-expanded": this.state.expanded,
          })}
        >
          <li>
            <button className="p-link">
              <i className="pi pi-fw pi-user" />
              <span>Perfil</span>
            </button>
          </li>
          <li>
            <button className="p-link">
              <i className="pi pi-fw pi-power-off" />
              <span>Sair</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
