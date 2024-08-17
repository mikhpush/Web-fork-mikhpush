import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAvailableDaos } from "./widgets/daoes";
// import { tokenInfo } from "./data/tokens";
import { daoesStore } from "./domen/daoesStore";
import { observer } from "mobx-react-lite";

const TokenDashboardNavigation = observer(() => {
  const [daoIds, setDaoIds] = useState([]);
  useEffect(() => {
    let isCancelled = false;
    const fn = async () => {
      const daoIds = await getAvailableDaos(
        daoesStore.getDaoesSelector(),
        daoesStore.getTokenInfoSelector(),
        daoesStore.getTokensSelector()
      );
      if (!isCancelled) {
        setDaoIds(daoIds);
      }
    };
    fn();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="breadcrumbs">
      {daoIds.map((token) => (
        <NavLink
          key={token}
          className="breadcrumbs__item"
          to={`/dashboard/${token}`}
        >
          <div style={{ display: "flex" }}>
            <span>
              {daoesStore.tokenInfo[token].fullName ||
                daoesStore.tokenInfo[token].name}
            </span>
            <div
              style={{
                width: "1px",
                height: "16px",
                margin: "2px 10px",
                backgroundColor: "white",
              }}
            />
          </div>
        </NavLink>
      ))}
    </div>
  );
});

export default TokenDashboardNavigation;
