import React from "react";
import { Holding } from "../types/tax";
import { formatRupee } from "../utils/calculations";

interface HoldingsRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: (coin: string) => void;
}

export const HoldingsRow: React.FC<HoldingsRowProps> = ({
  holding,
  isSelected,
  onToggle,
}) => {
  const {
    coin,
    coinName,
    logo,
    totalHoldings,
    averageBuyPrice,
    currentPrice,
    stcg,
    ltcg,
  } = holding;

  // Total amount value (Holdings quantity * Current Price or average depending on platform definition, prompt specifies "Amount to Sell shows totalHoldings value only when checked")
  // In prompt: "Amount to Sell column shows totalHoldings value only when that row is checked, otherwise shows '-' or blank"
  // Here totalHoldings is formatted as Rupee value.
  const amountToSellDisplay = isSelected ? formatRupee(totalHoldings) : "-";

  return (
    <tr
      onClick={() => onToggle(coin)}
      className={`border-b border-gray-100 dark:border-gray-800 transition-colors cursor-pointer select-none ${
        isSelected
          ? "bg-blue-50/70 dark:bg-blue-950/20 hover:bg-blue-100/70 dark:hover:bg-blue-950/30 font-medium"
          : "hover:bg-gray-50 dark:hover:bg-gray-800/50 bg-white dark:bg-[#12121e]"
      }`}
    >
      {/* Checkbox */}
      <td className="p-4 text-center w-12" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(coin)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-[#2D5BFF]"
        />
      </td>

      {/* Asset */}
      <td className="p-4">
        <div className="flex items-center gap-3 min-w-[140px]">
          <span className="text-2xl w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full shrink-0">
            {logo}
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              {coinName}
            </span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {coin}
            </span>
          </div>
        </div>
      </td>

      {/* Holdings */}
      <td className="p-4 text-right whitespace-nowrap text-gray-700 dark:text-gray-300">
        {formatRupee(totalHoldings)}
      </td>

      {/* Avg Buy Price */}
      <td className="p-4 text-right whitespace-nowrap text-gray-600 dark:text-gray-400">
        {formatRupee(averageBuyPrice)}
      </td>

      {/* Current Price */}
      <td className="p-4 text-right whitespace-nowrap text-gray-900 dark:text-gray-100 font-semibold">
        {formatRupee(currentPrice)}
      </td>

      {/* Short-Term Gain */}
      <td className="p-4 text-right whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
            stcg.gain > 0
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
              : stcg.gain < 0
              ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"
              : "text-gray-500"
          }`}
        >
          {stcg.gain > 0 ? "+" : ""}
          {formatRupee(stcg.gain)}
        </span>
      </td>

      {/* Long-Term Gain */}
      <td className="p-4 text-right whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
            ltcg.gain > 0
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
              : ltcg.gain < 0
              ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"
              : "text-gray-500"
          }`}
        >
          {ltcg.gain > 0 ? "+" : ""}
          {formatRupee(ltcg.gain)}
        </span>
      </td>

      {/* Amount to Sell */}
      <td className="p-4 text-right whitespace-nowrap">
        <span
          className={`font-bold transition-all ${
            isSelected
              ? "text-blue-600 dark:text-blue-400 px-2.5 py-1 bg-blue-100/60 dark:bg-blue-900/40 rounded-lg inline-block shadow-sm"
              : "text-gray-400"
          }`}
        >
          {amountToSellDisplay}
        </span>
      </td>
    </tr>
  );
};
