import { hoverable } from "common/mixins/hoverable";
import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { themeStore } from "stores/stores";
import "./nav-item.scss";

export interface INavItemProps {
  path: string;
  label: string;
  iconClass: string;
}

@(withRouter as any)
export class NavItem extends React.Component<INavItemProps> {
  public render() {
    const { navColor, navHoverBgColor } = themeStore.theme;

    return (
      <NavLink className="nav-item fl jc-c ai-c point" style={{ color: navColor }}
        to={this.props.path} activeClassName="active"
        {...hoverable({ backgroundColor: navHoverBgColor })}>
        <div className="ta-c">
          <i className={`fa fa-${this.props.iconClass}`} />
          <div className="nav-item-label">{this.props.label}</div>
        </div>
      </NavLink>
    );
  }
}
