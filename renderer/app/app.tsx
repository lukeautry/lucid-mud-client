import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { themeStore } from "stores/stores";
import "./app.scss";
import { Nav } from "./nav/nav";
import { getPath } from "./routes";
import { Terminal } from "./terminal/terminal";
import { Worlds } from "./worlds/worlds";

@(withRouter as any)
export class App extends React.Component {
  constructor(public readonly props: {}) {
    super(props);
  }

  public render() {
    return <div className="app fl">
      <Nav />
      <div className="fl-gr" style={{ backgroundColor: themeStore.theme.contentBgColor }} >
        <Switch>
          <Route path={getPath((p) => p.terminal)} component={Terminal} />
          <Route path={getPath((p) => p.worlds)} component={Worlds} />
          <Redirect to={getPath((p) => p.terminal)} />
        </Switch>
      </div>
    </div>;
  }
}
