import React, { Suspense, lazy } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import { Spin } from "../antd_components";
import { SpinTip } from "./SpinTip.styled";
import { darkPallete } from '../styles/pallete';
import { GlobalStyles } from '../styles/globalStyles';

const HomeComponent = lazy(() => import("../Pages/Home/home.component"));

const { darkBackground, greenText } = darkPallete;

const Routes = () => (
  <Router>
    <Suspense
      fallback={<Spin
        tip={<SpinTip>Carregando...</SpinTip>}
        size='large'
        color={greenText}
        backgroundColor={darkBackground}
      />}
    >
      <Switch>
        <Route path='/' element={<HomeComponent />} />
      </Switch>
    </Suspense>
    <GlobalStyles />
  </Router>
);

export default Routes;
