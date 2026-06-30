import { CapitalGains, Holding } from "../types/tax";

const MOCK_CAPITAL_GAINS: CapitalGains = {
  stcg: { profits: 12000, losses: 5000 },
  ltcg: { profits: 25000, losses: 8000 },
};

const MOCK_HOLDINGS: Holding[] = [
  {
    coin: "ETH",
    coinName: "Ethereum",
    logo: "🔷",
    totalHoldings: 145000,
    averageBuyPrice: 240000,
    currentPrice: 285000,
    stcg: { gain: -15000, balance: 145000 },
    ltcg: { gain: 18000, balance: 145000 },
  },
  {
    coin: "BTC",
    coinName: "Bitcoin",
    logo: "₿",
    totalHoldings: 320000,
    averageBuyPrice: 5200000,
    currentPrice: 5800000,
    stcg: { gain: 24000, balance: 320000 },
    ltcg: { gain: 45000, balance: 320000 },
  },
  {
    coin: "SOL",
    coinName: "Solana",
    logo: "☀️",
    totalHoldings: 85000,
    averageBuyPrice: 14500,
    currentPrice: 11200,
    stcg: { gain: -8500, balance: 85000 },
    ltcg: { gain: -12000, balance: 85000 },
  },
  {
    coin: "MATIC",
    coinName: "Polygon",
    logo: "🟣",
    totalHoldings: 45000,
    averageBuyPrice: 85,
    currentPrice: 62,
    stcg: { gain: -4200, balance: 45000 },
    ltcg: { gain: -2100, balance: 45000 },
  },
  {
    coin: "ADA",
    coinName: "Cardano",
    logo: "₳",
    totalHoldings: 60000,
    averageBuyPrice: 42,
    currentPrice: 55,
    stcg: { gain: 8200, balance: 60000 },
    ltcg: { gain: 3400, balance: 60000 },
  },
  {
    coin: "AVAX",
    coinName: "Avalanche",
    logo: "🔺",
    totalHoldings: 38000,
    averageBuyPrice: 3200,
    currentPrice: 2100,
    stcg: { gain: -6400, balance: 38000 },
    ltcg: { gain: -5000, balance: 38000 },
  },
  {
    coin: "LINK",
    coinName: "Chainlink",
    logo: "🔗",
    totalHoldings: 52000,
    averageBuyPrice: 1250,
    currentPrice: 1480,
    stcg: { gain: 3100, balance: 52000 },
    ltcg: { gain: -1800, balance: 52000 },
  },
  {
    coin: "DOT",
    coinName: "Polkadot",
    logo: "🔴",
    totalHoldings: 74000,
    averageBuyPrice: 820,
    currentPrice: 610,
    stcg: { gain: -7200, balance: 74000 },
    ltcg: { gain: -9500, balance: 74000 },
  },
  {
    coin: "DOGE",
    coinName: "Dogecoin",
    logo: "🐕",
    totalHoldings: 28000,
    averageBuyPrice: 14,
    currentPrice: 11,
    stcg: { gain: -3100, balance: 28000 },
    ltcg: { gain: 1200, balance: 28000 },
  }
];

export const fetchCapitalGains = (shouldFail = false): Promise<CapitalGains> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to fetch Capital Gains data"));
      } else {
        resolve(JSON.parse(JSON.stringify(MOCK_CAPITAL_GAINS)));
      }
    }, 300);
  });
};

export const fetchHoldings = (shouldFail = false): Promise<Holding[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to fetch Holdings data"));
      } else {
        resolve(JSON.parse(JSON.stringify(MOCK_HOLDINGS)));
      }
    }, 300);
  });
};
