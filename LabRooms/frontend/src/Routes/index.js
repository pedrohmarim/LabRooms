import React, { Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import { Spin } from "../antd_components";
import { darkPallete } from "../styles/pallete";
import { GlobalStyles } from "../styles/globalStyles";
import routes from "./routes";

export default function Routes() {
  return (
    <Router>
      <Suspense fallback={<Spin color={darkPallete.white} />}>
        <Switch>
          {routes.map(({ path, Component }, key) => {
            return <Route path={path} key={key} element={Component} />;
          })}
        </Switch>
      </Suspense>
      <GlobalStyles />
    </Router>
  );
}
