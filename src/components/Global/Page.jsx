import React, { Component } from "react";
import classNames from "classnames";
import { AppTopbar } from "../../AppTopbar";
import { AppMenu } from "../../AppMenu";
import { AppProfile } from "../../AppProfile";
import { BreadCrumb } from "primereact/breadcrumb";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "../../layout/layout.scss";
import "../../App.scss";
import LOGO from "../../assets/images/logoSGC.svg";
import { NavLink } from "react-router-dom";
import { MenuConfig } from "../../configs/routes.constants";
import { Button, Col, Row } from "reactstrap";

class Page extends Component {
  constructor() {
    super();
    this.state = {
      layoutMode: "static",
      layoutColorMode: "dark",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      isMobile: false,
      clicado: false,
    };

    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.createMenu();
  }

  onWrapperClick() {
    if (!this.menuClick) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }

    this.menuClick = false;
  }

  onToggleMenu(event) {
    this.menuClick = true;

    if (this.isDesktop()) {
      if (this.state.layoutMode === "overlay") {
        this.setState({
          overlayMenuActive: !this.state.overlayMenuActive,
          clicado: !this.state.clicado,
        });
      } else if (this.state.layoutMode === "static") {
        this.setState({
          staticMenuInactive: !this.state.staticMenuInactive,
          clicado: !this.state.clicado,
        });
      }
    } else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({
        mobileMenuActive: !mobileMenuActive,
        clicado: !this.state.clicado,
      });
    }

    event.preventDefault();
  }

  onSidebarClick() {
    this.menuClick = true;
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false,
      });
    }
  }

  createMenu() {
    this.menu = MenuConfig;
  }

  addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  }

  removeClass(element, className) {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi",
        ),
        " ",
      );
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  componentDidUpdate() {
    if (this.state.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  }

  render() {
    // const logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg': 'assets/layout/images/logo.svg';

    const wrapperClass = classNames("layout-wrapper", {
      "layout-overlay": this.state.layoutMode === "overlay",
      "layout-static": this.state.layoutMode === "static",
      "layout-static-sidebar-inactive":
        this.state.staticMenuInactive && this.state.layoutMode === "static",
      "layout-overlay-sidebar-active":
        this.state.overlayMenuActive && this.state.layoutMode === "overlay",
      "layout-mobile-sidebar-active": this.state.mobileMenuActive,
    });

    const sidebarClassName = classNames("layout-sidebar", {
      "layout-sidebar-dark": this.state.layoutColorMode === "dark",
      "layout-sidebar-light": this.state.layoutColorMode === "light",
    });

    const home = { icon: "pi pi-home", url: "/" };

    return (
      <div className={wrapperClass} onClick={this.onWrapperClick}>
        <AppTopbar
          onToggleMenu={this.onToggleMenu}
          clicado={this.state.clicado}
        />

        <div
          ref={el => (this.sidebar = el)}
          className={sidebarClassName}
          onClick={this.onSidebarClick}
        >
          <div className="layout-logo fixed-top w-coad-logo d-none d-sm-block">
            <NavLink to="/" alt="Home">
              <img alt="Logo" src={LOGO} />
            </NavLink>
          </div>
          <AppProfile />
          <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
        </div>

        <div className="layout-main">
          <BreadCrumb model={this.props.breadcrumb} home={home} />
          <Row>
            <Col lg={10}>
              {this.props.titulo && (
                <h3 className="pt-3">{this.props.titulo}</h3>
              )}
            </Col>
            <Col lg={2} className="comeback">
              {this.props.titulo && (
                <Button
                  onClick={this.props.onClickVoltar}
                  className="btn btn-coad-background-outline"
                >
                  <i className="fas fa-arrow-left" /> Voltar
                </Button>
              )}
            </Col>
          </Row>
          {this.props.children}
        </div>

        <div className="layout-mask"></div>
      </div>
    );
  }
}

export default Page;
