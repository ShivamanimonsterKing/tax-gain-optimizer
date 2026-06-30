import React from "react";
import { useTaxHarvesting } from "../context/TaxHarvestingContext";
import { HoldingsRow } from "./HoldingsRow";

export const HoldingsTable: React.FC = () => {
  const { holdings, selectedCoinIds, toggleSelectCoin, toggleSelectAll, loading } =
    useTaxHarvesting();

  const isAllSelected =
    holdings.length > 0 && selectedCoinIds.size === holdings.length;
  const isSomeSelected =
    selectedCoinIds.size > 0 && selectedCoinIds.size < holdings.length;

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#12121e] rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 animate-pulse">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        </div>
        <div className="space-y-4 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-14 bg-gray-100 dark:bg-gray-800/60 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#12121e] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xl overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-[#161625]">
        <div>
          <h3 className="font-extrabold text-xl text-gray-900 dark:text-white flex items-center gap-2">
            <span>Crypto Holdings</span>
            <span className="text-xs py-0.5 px-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full font-bold">
              {holdings.length} Assets
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Select holdings with losses below to harvest tax savings and offset your capital gains.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedCoinIds.size > 0 && (
            <button
              onClick={toggleSelectAll}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 underline underline-offset-2 transition-colors"
            >
              Clear Selection ({selectedCoinIds.size})
            </button>
          )}
          <span className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200/60 dark:border-blue-800/60">
            💡 Tip: Check coins with red loss indicators
          </span>
        </div>
      </div>

      {/* Horizontally scrollable wrapper */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-100/75 dark:bg-[#19192b] text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider font-extrabold border-b border-gray-200 dark:border-gray-800 select-none">
              {/* Select All Checkbox */}
              <td className="p-4 text-center w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isSomeSelected;
                  }}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-[#2D5BFF]"
                  title="Select All Holdings"
                />
              </td>
              <th className="p-4">Asset</th>
              <th className="p-4 text-right">Holdings Value</th>
              <th className="p-4 text-right">Avg Buy Price</th>
              <th className="p-4 text-right">Current Price</th>
              <th className="p-4 text-right">Short-Term Gain</th>
              <th className="p-4 text-right">Long-Term Gain</th>
              <th className="p-4 text-right text-blue-600 dark:text-blue-400">Amount to Sell</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80 text-sm">
            {holdings.map((holding) => (
              <HoldingsRow
                key={holding.coin}
                holding={holding}
                isSelected={selectedCoinIds.has(holding.coin)}
                onToggle={toggleSelectCoin}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state safeguard */}
      {holdings.length === 0 && (
        <div className="p-12 text-center text-gray-400">
          No holdings available.
        </div>
      )}
    </div>
  );
};
