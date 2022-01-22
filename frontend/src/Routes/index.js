import React, { Suspense, lazy } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
  Link,
} from "react-router-dom";
import { Spin } from "../antd_components";
import { SpinTip } from "./SpinTip.styled";
import { darkPallete } from "../styles/pallete";
import { GlobalStyles } from "../styles/globalStyles";

const HomeComponent = lazy(() => import("../Pages/Home/home.component"));
const NotFoundComponent = lazy(() =>
  import("../Pages/NotFound/notfound.component")
);

const { lightblue, white } = darkPallete;

const Routes = () => (
  <Router>
    <Suspense
      fallback={
        <Spin
          tip={<SpinTip>Carregando...</SpinTip>}
          size='large'
          color={white}
          backgroundcolor={lightblue}
        />
      }
    >
      <Switch>
        <Route path='/' element={<HomeComponent Link={Link} />} />
        <Route path={"/notfound" && "*"} element={<NotFoundComponent />} />
      </Switch>
    </Suspense>
    <GlobalStyles />
  </Router>
);

export default Routes;
