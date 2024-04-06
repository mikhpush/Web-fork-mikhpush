import React from "react";
import { useTokenDatas } from "./useTokenData";
import { round } from "./round";
import { useBlastData } from "./useBlastData";

const uniqueBy = (x, f) =>
  Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}));

const computeSum = (datas) => {
  let unique = (a) => a.filter((item, i, ar) => ar.indexOf(item) === i);
  let tokens = unique(datas.map((d) => d.token.toLowerCase()));
  let sum = 0;
  for (let token of tokens) {
    const dataz = datas.filter(
      (d) => d.token.toLowerCase() === token.toLowerCase()
    );
    const lastDay = dataz[0].dayId;
    const lastDayDatas = dataz.filter((d) => d.dayId === lastDay);
    const uniqueLastDayDatas = uniqueBy(lastDayDatas, (d) =>
      d.token.toLowerCase()
    );
    const merged = uniqueLastDayDatas;
    const tokenSum = Number.parseInt(
      round(Number.parseFloat(merged[0].totalPrice) / 10 ** 18 / 10 ** 6, 0) -
        (merged[0].totalCarry > 0 ? merged[0].totalCarry : 0 || 0)
    );
    sum += tokenSum;
  }
  return sum;
};

const TotalPrice = (props) => {
  const { tokens } = props;
  const noBlastTokens = tokens.filter(
    (token) => token !== "0x50987cf58b7351867952912Cf87c75AB2a8a60A4"
  );
  const { loading, merged } = useTokenDatas(noBlastTokens);

  const { blastTotal, isLoading: isBlasdataLoading } = useBlastData();

  if (loading || !merged || isBlasdataLoading) {
    return <>...</>;
  }
  const noBlastTotalPrice = computeSum(merged);
  const totalPrice = noBlastTotalPrice + blastTotal.usd;
  return (
    <>
      ${" "}
      {totalPrice
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    </>
  );
};

export default TotalPrice;
