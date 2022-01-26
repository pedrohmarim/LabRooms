import React, { Suspense, lazy } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import { Spin } from "../antd_components";
import { SpinTip } from "./SpinTip.styled";
import { darkPallete } from "../styles/pallete";
import { GlobalStyles } from "../styles/globalStyles";
import routes from "./routes";


const { white } = darkPallete;

const Routes = () => (
  <Router>
    <Suspense
      fallback={
        <Spin
          tip={<SpinTip>Carregando...</SpinTip>}
          size='large'
          color={white}
        />
      }
    >
      <Switch>
        {routes.map(({ path, Component }, key) => (
          <Route
            exact
            path={path}
            key={key}
            element={Component}
          />
        ))}
      </Switch>
    </Suspense>
    <GlobalStyles />
  </Router>
);

export default Routes;
