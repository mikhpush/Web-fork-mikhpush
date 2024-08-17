import React from "react";
// import { tokenInfo } from "./data/tokens";
import { DaoLiquidity } from "./widgets/DaoLiquidity";
import TokenOnChainValidation from "./TokenOnChainValidation";
import { daoesStore } from "./domen/daoesStore";
import { observer } from "mobx-react-lite";

const HeaderTokenBalance = observer((props) => {
  const tokenInfo = daoesStore.tokenInfo;
  const token = props.match.params.id;
  const tokenAddress = tokenInfo[token].address;

  return (
    <>
      <div className="balance">
        <div className="balance__amount">
          <DaoLiquidity separator=" " tokenAddress={tokenAddress} />
        </div>
      </div>
      <TokenOnChainValidation token={token} />
    </>
  );
});

export default HeaderTokenBalance;
