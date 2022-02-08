import React, { Suspense, useContext } from "react";
import { UserContext } from "../Context/UserContext";
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

const Routes = () => {
  const { token } = useContext(UserContext);

  return (
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
          {routes.map(({ path, Component, isPrivate }, key) => {
            if(isPrivate && !token) {
              return <Route path="/" />
            }
  
            return (
              <Route path={path} key={key} element={Component} />
            )
          })}
        </Switch>
      </Suspense>
      <GlobalStyles />
    </Router>
  )
};

export default Routes;
