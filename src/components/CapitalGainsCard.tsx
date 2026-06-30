import React from "react";
import { CapitalGains } from "../types/tax";
import { formatRupee, netGains } from "../utils/calculations";

interface CapitalGainsCardProps {
  title: string;
  variant: "before" | "after";
  capitalGains: CapitalGains | null;
  savings?: number;
  loading?: boolean;
}

export const CapitalGainsCard: React.FC<CapitalGainsCardProps> = ({
  title,
  variant,
  capitalGains,
  savings = 0,
  loading = false,
}) => {
  const isBefore = variant === "before";

  // Card background styling
  const cardBgClass = isBefore
    ? "bg-[#1A1A2E] text-white border border-gray-800 shadow-xl"
    : "bg-gradient-to-br from-[#2D5BFF] to-[#1E40D8] text-white shadow-xl shadow-blue-500/10";

  const computedGains = capitalGains ? netGains(capitalGains) : null;

  if (loading || !capitalGains || !computedGains) {
    return (
      <div className={`rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full min-h-[320px] ${cardBgClass} animate-pulse`}>
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="h-6 w-36 bg-white/20 rounded"></div>
          <div className="h-5 w-20 bg-white/20 rounded-full"></div>
        </div>
        <div className="space-y-6 my-6">
          <div className="space-y-3">
            <div className="h-4 w-28 bg-white/20 rounded"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-white/10 rounded"></div>
              <div className="h-8 bg-white/10 rounded"></div>
              <div className="h-8 bg-white/10 rounded"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-28 bg-white/20 rounded"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-white/10 rounded"></div>
              <div className="h-8 bg-white/10 rounded"></div>
              <div className="h-8 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 flex justify-between items-center">
          <div className="h-5 w-36 bg-white/20 rounded"></div>
          <div className="h-8 w-28 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${cardBgClass}`}>
      {/* Subtle background glow element for right card */}
      {!isBefore && (
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isBefore ? "bg-amber-400" : "bg-emerald-400 animate-pulse"}`}></span>
            <h3 className="font-bold text-lg md:text-xl tracking-tight">{title}</h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 font-medium tracking-wide uppercase text-white/80">
            {isBefore ? "Current State" : "Projected"}
          </span>
        </div>

        {/* Savings Alert Banner for After Card */}
        {!isBefore && savings > 0 && (
          <div className="mt-4 bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-between border border-emerald-400/30 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-base">You're going to save:</span>
            </div>
            <span className="text-lg md:text-xl font-extrabold bg-black/20 px-3 py-0.5 rounded-lg tracking-wide">
              {formatRupee(savings)}
            </span>
          </div>
        )}

        {/* Breakdown Tables */}
        <div className="my-6 space-y-6">
          {/* Short Term */}
          <div className="bg-black/20 md:bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3 flex items-center gap-1.5">
              <span>Short-Term Capital Gains (STCG)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[11px] text-white/50 block mb-1">Profits</span>
                <span className="font-semibold text-sm md:text-base text-emerald-300 truncate block">
                  {formatRupee(capitalGains.stcg.profits)}
                </span>
              </div>
              <div className="border-x border-white/10 px-1">
                <span className="text-[11px] text-white/50 block mb-1">Losses</span>
                <span className="font-semibold text-sm md:text-base text-rose-300 truncate block">
                  {formatRupee(capitalGains.stcg.losses)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-white/50 block mb-1">Net Gain</span>
                <span className={`font-bold text-sm md:text-base truncate block ${computedGains.netSTCG >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                  {formatRupee(computedGains.netSTCG)}
                </span>
              </div>
            </div>
          </div>

          {/* Long Term */}
          <div className="bg-black/20 md:bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3 flex items-center gap-1.5">
              <span>Long-Term Capital Gains (LTCG)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[11px] text-white/50 block mb-1">Profits</span>
                <span className="font-semibold text-sm md:text-base text-emerald-300 truncate block">
                  {formatRupee(capitalGains.ltcg.profits)}
                </span>
              </div>
              <div className="border-x border-white/10 px-1">
                <span className="text-[11px] text-white/50 block mb-1">Losses</span>
                <span className="font-semibold text-sm md:text-base text-rose-300 truncate block">
                  {formatRupee(capitalGains.ltcg.losses)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-white/50 block mb-1">Net Gain</span>
                <span className={`font-bold text-sm md:text-base truncate block ${computedGains.netLTCG >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                  {formatRupee(computedGains.netLTCG)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Total Realised */}
      <div className="border-t border-white/15 pt-5 mt-2 flex items-center justify-between">
        <div>
          <span className="text-xs md:text-sm font-medium text-white/70 block">Realised Capital Gains</span>
          <span className="text-[11px] text-white/40 block">Total taxable net gain</span>
        </div>
        <div className="text-right">
          <span className={`text-xl md:text-2xl lg:text-3xl font-black tracking-tight ${computedGains.realised >= 0 ? "text-white" : "text-rose-300"}`}>
            {formatRupee(computedGains.realised)}
          </span>
          {!isBefore && savings > 0 && (
            <span className="text-[11px] text-emerald-300 font-semibold block mt-0.5">
              Reduced from {formatRupee(computedGains.realised + savings)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
