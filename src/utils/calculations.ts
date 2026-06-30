import { CapitalGains, Holding, NetGainsResult } from "../types/tax";

/**
 * Calculates net gains and realised gains from a CapitalGains object
 */
export const netGains = (capitalGains: CapitalGains): NetGainsResult => {
  const netSTCG = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const netLTCG = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const realised = netSTCG + netLTCG;

  return {
    netSTCG,
    netLTCG,
    realised,
  };
};

/**
 * Applies harvesting logic for selected coin tickers/IDs onto base capital gains.
 * Returns a new CapitalGains object.
 */
export const applyHarvesting = (
  baseCapitalGains: CapitalGains,
  holdings: Holding[],
  selectedCoinIds: Set<string>
): CapitalGains => {
  // Start from a deep copy of baseCapitalGains
  const updated: CapitalGains = JSON.parse(JSON.stringify(baseCapitalGains));

  // For each selected holding
  holdings.forEach((holding) => {
    if (selectedCoinIds.has(holding.coin)) {
      // Handle STCG
      if (holding.stcg.gain > 0) {
        updated.stcg.profits += holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        updated.stcg.losses += Math.abs(holding.stcg.gain);
      }

      // Handle LTCG independently
      if (holding.ltcg.gain > 0) {
        updated.ltcg.profits += holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        updated.ltcg.losses += Math.abs(holding.ltcg.gain);
      }
    }
  });

  return updated;
};

/**
 * Formats a number as Indian Rupee (₹) currency string with commas.
 * Rounds to whole number.
 */
export const formatRupee = (amount: number): string => {
  const rounded = Math.round(amount);
  const isNegative = rounded < 0;
  const absVal = Math.abs(rounded);

  // Indian numbering format (lakhs/crores)
  const formattedString = absVal.toLocaleString("en-IN");

  return `${isNegative ? "-" : ""}₹${formattedString}`;
};
