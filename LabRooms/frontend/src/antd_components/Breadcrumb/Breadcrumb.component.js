import React from "react";
import * as S from "./Breadcrumb.styled";
import routes from "../../Routes/routes";
import { Tooltip } from "antd";
import { darkPallete } from "../../styles/pallete";

const Breadcrumb = ({ crumbs = routes }) => {
  function handleCompareProps(bc, linkTo) {
    let pathname = `/${window.location.pathname.split("/")[1]}`;

    if (pathname === bc.breadcrumb || pathname === bc.path)
      return !linkTo ? "Você Está Aqui." : null;

    return !linkTo ? bc.tooltip : bc.path || bc.breadcrumb;
  }

  return (
    <S.Breadcrumb color='#000'>
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
                    title={handleCompareProps(bc)}
                  >
                    <S.StyledLink
                      to={{
                        pathname: handleCompareProps(bc, true),
                      }}
                      color='#000'
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
