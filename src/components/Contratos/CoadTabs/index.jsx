import React, { useState } from "react";
import { NavItem, NavLink, Nav, TabPane, TabContent } from "reactstrap";
import classnames from "classnames";

export const CoadTabs = props => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { titulo1, titulo2 } = props;

  return (
    <div>
      <Nav tabs className="border-0">
        <NavItem
          className={`coad-tab-nav-item text-center font-weight-bold coad-color mr-1 ${
            activeTab === "1" ? "coad-active" : ""
          }`}
        >
          <NavLink
            className={
              classnames({ active: activeTab === "1" }) + " coad-color border-0"
            }
            onClick={() => {
              toggle("1");
            }}
          >
            {titulo1}
          </NavLink>
        </NavItem>
        <NavItem
          className={`coad-tab-nav-item text-center font-weight-bold coad-color ml-1 ${
            activeTab === "2" ? "coad-active" : ""
          }`}
        >
          <NavLink
            className={
              classnames({ active: activeTab === "2" }) + " coad-color border-0"
            }
            onClick={() => {
              toggle("2");
            }}
          >
            {titulo2}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="mt-3">
        <TabPane tabId="1">{props.conteudo1}</TabPane>
        <TabPane tabId="2">{props.conteudo2}</TabPane>
      </TabContent>
    </div>
  );
};
