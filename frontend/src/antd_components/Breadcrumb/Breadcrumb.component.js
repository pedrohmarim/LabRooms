import React from "react";
import { Link } from "react-router-dom";
import * as S from "./Breadcrumb.styled";
import routes from "../../Routes/routes";
import { darkPallete } from "../../styles/pallete";

const Breadcrumb = ({ crumbs = routes }) => {
  return (
    window.location.pathname !== "/" && (
      <S.Breadcrumb color={darkPallete.white}>
        {crumbs?.length &&
          crumbs
            .filter(({ path }) => window.location.pathname.includes(path))
            .map((bc) =>
              bc.path ? (
                <S.Breadcrumb.Item key={bc.name}>
                  <Link
                    to={{
                      pathname: bc.path,
                    }}
                    style={{ color: darkPallete.white }}
                  >
                    {bc.name}
                  </Link>
                </S.Breadcrumb.Item>
              ) : (
                <S.Breadcrumb.Item key={bc.name}>{bc.name}</S.Breadcrumb.Item>
              )
            )}
      </S.Breadcrumb>
    )
  );
};

export default Breadcrumb;
