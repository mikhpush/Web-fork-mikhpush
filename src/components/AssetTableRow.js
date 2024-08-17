import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AssetTableRowDropdown from "./AssetTableRowDropdown";
// import { tokenInfo } from "./data/tokens";
import APY from "./widgets/APY";
import TokenPriceLegacy from "./widgets/legacy/TokenPriceLegacy";
import { DaoLiquidity } from "./widgets/DaoLiquidity";
import { observer } from "mobx-react-lite";
import { daoesStore } from "./domen/daoesStore";
import { toJS } from "mobx";

const AssetTableRow = observer((props) => {
  const { dao, connectWeb3, open, onClick, legacy, web3Global } = props;
  const myRef = useRef(null);
  const location = useLocation();
  const defaultToken = dao.defaultToken;
  useEffect(() => {
    if (
      myRef &&
      location.hash &&
      location.hash.endsWith(`#${defaultToken[0]}`) &&
      dao.id === defaultToken[0]
    ) {
      setTimeout(() => {
        if (myRef.current) {
          myRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center",
          });
        }
      }, 100);
    }
  }, [location, myRef, myRef.current]);

  return (
    <>
      <div
        className={"main-table__tr activeToggle" + (open ? " active" : "")}
        onClick={onClick}
      >
        <div className="main-table__td">
          <div className="main-table__td-row">
            <img className="main-table__icon" src="img/logo.png" alt="" />
            <span>{dao.display_name}</span>
          </div>
        </div>
        <div className="main-table__td">
          {legacy ? (
            <TokenPriceLegacy
              tokenAddress={daoesStore.tokenInfo[dao.id].address}
            />
          ) : (
            <DaoLiquidity
              tokenAddress={daoesStore.tokenInfo[dao.id].address}
              dao={dao}
            />
          )}
        </div>
        <div className="main-table__td">
          {dao.name === "Berezka ETH" || dao.name === "berezkablastdao" ? (
            "—"
          ) : (
            <APY
              tokenAddress={daoesStore.tokenInfo[dao.id].address}
              decimals={0}
              apy={dao.DaoInfo.apy_total_in_usd}
            />
          )}
        </div>
        <div className="main-table__td">
          <div className="main-table__dropdown-btn" ref={myRef} />
        </div>
      </div>
      <AssetTableRowDropdown
        legacy={legacy}
        connectWeb3={connectWeb3}
        dao={dao}
        web3Global={web3Global}
      />
    </>
  );
});

export default React.memo(AssetTableRow);
