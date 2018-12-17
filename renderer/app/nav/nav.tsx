import { getPath } from "app/routes";
import { observer } from "mobx-react";
import React from "react";
import { themeStore } from "stores/stores";
import { NavItem } from "./nav-item";
import "./nav.scss";

export interface INavProps {
}

@observer
export class Nav extends React.Component<INavProps> {
  public render() {
    return (
      <div className="nav" style={{ backgroundColor: themeStore.theme.navBgColor }}>
        <NavItem label="Terminal" iconClass="terminal" path={getPath((p) => p.terminal)} />
        <NavItem label="Worlds" iconClass="globe-americas" path={getPath((p) => p.worlds)} />
      </div>
    );
  }
}
