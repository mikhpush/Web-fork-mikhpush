import { makeAutoObservable } from "mobx";
import { fetchDaos } from "../widgets/daoes";

class DaoesStore {
  constructor() {
    makeAutoObservable(this);
  }

  daoes = [];
  isLoadedDaoes = false;
  tokenInfo = {};
  tokens = [];
  defaultToken = [];
  tokenAddresses = [];

  getTokenInfoSelector = () => {
    return this.tokenInfo;
  };

  getDaoesSelector = () => {
    return this.daoes;
  };

  getTokenAddressesSelector = () => {
    return this.tokenAddresses;
  };

  getTokensSelector = () => {
    return this.tokens;
  };

  async loadDaoes() {
    try {
      this.daoes = await fetchDaos();

      this.fillTokens.call(this);
    } catch (e) {
      console.error("Error fetching daoes", e);
    }
  }

  fillTokens() {
    this.tokens.splice(0, this.tokens.length);
    this.tokenAddresses.splice(0, this.tokenAddresses.length);
    this.defaultToken[0] = this.daoes[0].id;
    for (let dao of this.daoes) {
      if (dao.token.contract) {
        this.tokenInfo[dao.id] = {
          baseTokenSymbol: dao.base_currency,
          name: dao.display_name,
          fullName: dao.display_name,
          address: dao.token.contract,
          tableName: dao.display_name,
          symbol: dao.token.symbol,
          dao: dao.token_request_contract_address,
          withdrawAgent: dao.withdraw_agent_address,
          withdrawEnabled: dao.withdraw_enabled,
          depositEnabled: dao.deposit_enabled,
          isDexEnabled: false,
          minDepositAmount: dao.min_deposit_amount,
          apy: dao.DaoInfo.apy_total_in_usd,
        };

        this.tokens.push(dao.id);
        this.tokenAddresses.push(dao.token.contract);
      }
    }
    this.isLoadedDaoes = true;
  }
}

export const daoesStore = new DaoesStore();
