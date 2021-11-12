import React, { Suspense, lazy } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import { Spin } from "../antd_components";
import { SpinTip } from "./SpinTip.styled";

const HomeComponent = lazy(() => import("../Pages/Home/home.component"));

const Routes = () => (
  <Router>
    <Suspense
      fallback={
        <Spin
          tip={<SpinTip>Carregando...</SpinTip>}
          size='large'
          color='yellow'
          backgroundColor='green'
        />
      }
    >
      <Switch>
        <Route path='/' element={<HomeComponent />} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
