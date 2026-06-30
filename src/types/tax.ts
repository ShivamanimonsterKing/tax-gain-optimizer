export interface CapitalGains {
  stcg: { profits: number; losses: number };
  ltcg: { profits: number; losses: number };
}

export interface Holding {
  coin: string;        // ticker, e.g. "ETH"
  coinName: string;    // e.g. "Ethereum"
  logo: string;        // emoji or placeholder image URL
  totalHoldings: number;
  averageBuyPrice: number;
  currentPrice: number;
  stcg: { gain: number; balance: number };
  ltcg: { gain: number; balance: number };
}

export interface NetGainsResult {
  netSTCG: number;
  netLTCG: number;
  realised: number;
}
