import React from "react";
import { Link } from "react-router-dom";
import * as S from "./Breadcrumb.styled";
import routes from "../../Routes/routes";

const Breadcrumb = ({ crumbs = routes }) => {
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
                  <Link
                    to={{
                      pathname: bc.path,
                    }}
                    style={{ color: "#000" }}
                  >
                    {bc.name}
                  </Link>
                </S.Breadcrumb.Item>
              )
          )}
    </S.Breadcrumb>
  );
};

export default Breadcrumb;
