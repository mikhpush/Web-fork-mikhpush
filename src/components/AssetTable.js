import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { fetchDaos, getAvailableDaos } from "./widgets/daoes";
import { defaultToken } from "./data/tokens";
import AssetTableRow from "./AssetTableRow";
import AssetTableHeader from "./AssetTableHeader";
import { daoesStore } from "./domen/daoesStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const AssetTable = observer((props) => {
  const { connectWeb3, web3Global } = props;

  const [open, setOpen] = useState();
  const location = useLocation();
  const defaultToken = daoesStore.defaultToken;

  useEffect(() => {
    if (location.hash && location.hash.endsWith(`#${defaultToken[0]}`)) {
      setOpen(defaultToken[0]);
    }
  }, [location]);

  return (
    <div className="section _full main-table _mb">
      <AssetTableHeader />
      {daoesStore.getDaoesSelector() !== "undefined" &&
        daoesStore.getDaoesSelector().map((dao) => {
          const { id } = dao;
          return (
            <AssetTableRow
              open={open === id}
              onClick={() => {
                if (open === id) {
                  setOpen(null);
                } else {
                  setOpen(id);
                }
              }}
              key={id}
              dao={dao}
              connectWeb3={connectWeb3}
              web3Global={web3Global}
            />
          );
        })}
    </div>
  );
});

export default AssetTable;
