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
                    title={window.location.pathname.split('/')[1] === `/${bc.breadcrumb || bc.path}` ? "Você Está Aqui." : bc.tooltip }
                  >
                    <S.StyledLink
                      to={{ pathname: window.location.pathname.split('/')[1] === `/${bc.breadcrumb || bc.path}` ? null : bc.path || bc.breadcrumb }}
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
