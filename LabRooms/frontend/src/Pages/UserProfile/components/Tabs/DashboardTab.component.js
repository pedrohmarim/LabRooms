import React, { useContext, useEffect } from "react";

import { UserContext } from "../../../../Context/UserContext";

const DashboardTab = ({ dashboardActive }) => {
  const { getDashboardUsers, dashboardUsers } = useContext(UserContext);

  useEffect(() => {
    getDashboardUsers(dashboardActive.selectedRowKeys);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardActive.selectedRowKeys]);

  return <></>;
};

export default DashboardTab;
