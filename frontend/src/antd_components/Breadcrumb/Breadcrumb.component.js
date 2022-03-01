import React from "react";
import * as S from "./Breadcrumb.styled";
import routes from "../../Routes/routes";
import { Tooltip } from "antd";
import { darkPallete } from "../../styles/pallete";

const Breadcrumb = ({ crumbs = routes, color }) => {
  return (
    <S.Breadcrumb color={color || "#000"}>
      {crumbs?.length &&
        crumbs
          .filter(({ path, breadcrumb }) =>
            breadcrumb
              ? window.location.pathname.includes(breadcrumb)
              : window.location.pathname.includes(path)
          )
          .map(
            (bc) =>
              bc.path && (
                <S.Breadcrumb.Item key={bc.name}>
                  <Tooltip
                    color={darkPallete.lightblue}
                    title={
                      window.location.pathname === bc.path
                        ? "Você está aqui"
                        : bc.path === "/"
                        ? "Ir para Home"
                        : bc.path === "/profile/:username"
                        ? "Você está aqui"
                        : `Ir para ${bc.path}`
                    }
                  >
                    <S.StyledLink
                      to={{
                        pathname: bc.path,
                      }}
                      color={color || "#000"}
                    >
                      {bc.name}
                    </S.StyledLink>
                  </Tooltip>
                </S.Breadcrumb.Item>
              )
          )}
    </S.Breadcrumb>
  );
};

export default Breadcrumb;
