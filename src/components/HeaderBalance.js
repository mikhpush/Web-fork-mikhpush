import React from "react";
import TotalPrice from "./widgets/TotalPrice";
import { daoesStore } from "./domen/daoesStore";
import { observer } from "mobx-react-lite";

const HeaderBalance = observer((props) => {
  const { value } = props;
  return (
    <div className="balance">
      <div className="balance__amount">
        {value || (
          <TotalPrice tokens={daoesStore.getTokenAddressesSelector()} />
        )}
      </div>
    </div>
  );
});

export default HeaderBalance;
