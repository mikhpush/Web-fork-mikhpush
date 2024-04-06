import React from "react";
import { round } from "./round";
import { useTokenData } from "./useTokenData";
import { useBlastData } from "./useBlastData";
import { checkIsBlastDao } from "./checkIsBlastDao";

export const DaoLiquidity = (props) => {
  const { tokenAddress, separator, inBaseToken } = props;
  const { loading, merged } = useTokenData(tokenAddress);

  const isBlastDao = checkIsBlastDao(tokenAddress);

  const { blastTotal, isLoading: isBlasdataLoading } = useBlastData();

  if (loading || (isBlastDao && isBlasdataLoading)) {
    return <>...</>;
  }

  const currentLiquidity = inBaseToken
    ? merged[0].totalPriceInBaseToken
    : merged[0].totalPrice;
  const currentCarry = inBaseToken
    ? merged[0].totalCarryInBaseToken
    : merged[0].totalCarry;

  const prefix = inBaseToken ? "" : `$ `;

  const amount = isBlastDao
    ? blastTotal.usd
    : Number.parseInt(
        round(Number.parseFloat(currentLiquidity) / 10 ** 18 / 10 ** 6, 0) -
          (currentCarry > 0 ? currentCarry : 0)
      );

  return (
    <>
      {prefix}
      {amount
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, separator || ".")}
    </>
  );
};
