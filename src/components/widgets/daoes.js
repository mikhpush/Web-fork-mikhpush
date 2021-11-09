import { fetchDedupe } from "fetch-dedupe";
import { round } from "./round";

export const fetchCommonAll = async (tokens) => {
  let result = [];
  for (let token of tokens) {
    const tokenResult = await fetchCommon(token);
    result = [...result, ...tokenResult];
  }
  return result;
};

export const fetchCommon = async (tokenAddress, precision = 3) => {
  const daoes = await fetchDedupe(`/api/v1/public/daoes`).then(
    (res) => res.data
  );
  const dao = daoes.find(
    (dao) =>
      dao.token_contract_address.toLowerCase() === tokenAddress.toLowerCase()
  );
  if (!dao) {
    console.error(`Unable to get DAO for token address ${tokenAddress}`);
  }
  const daoId = dao.id;
  const prices = await fetchDedupe(
    `/api/v1/public/daoes/${daoId}/token_price_history_daily`
  ).then((res) => res.data);
  const adjusted = prices.map((data) => {
    return {
      date: round(new Date(data.dt).getTime() / 1000, 0),
      dayId: round(new Date(data.dt).getTime() / 1000, 0) / 86400,
      price:
        "" +
        round(Number.parseFloat(data.dao_token_price) * 10 ** 6, precision),
      token: tokenAddress.toLowerCase(),
      supply: round(Number.parseFloat(data.dao_token_amount) * 10 ** 18, 0),
      totalPrice: round(
        Number.parseFloat(data.gross_liquidity_value_in_usd) *
          10 ** 18 *
          10 ** 6,
        0
      ),
      totalCarry:
        Number.parseFloat(data.carry_accumulated_value_in_usd) -
        Number.parseFloat(data.carry_out_value_in_usd),
    };
  });
  return adjusted;
};