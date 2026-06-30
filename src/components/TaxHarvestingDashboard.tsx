import React from "react";
import { useTaxHarvesting } from "../context/TaxHarvestingContext";
import { CapitalGainsCard } from "../components/CapitalGainsCard";
import { HoldingsTable } from "../components/HoldingsTable";

export const TaxHarvestingDashboard: React.FC = () => {
  const {
    baseCapitalGains,
    harvestedCapitalGains,
    loading,
    error,
    retryFetch,
    simulateError,
    savings,
  } = useTaxHarvesting();

  return (
    <div className="min-h-screen bg-[#0A0A14] text-gray-100 selection:bg-blue-500 selection:text-white pb-20">
      {/* Platform Header Navigation */}
      <header className="border-b border-gray-800/80 bg-[#0F0F1E]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="w-10 h-10 shrink-0 bg-gradient-to-tr from-[#2D5BFF] to-[#6E88FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 font-black text-white text-xl">
              K
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="truncate text-xl sm:text-2xl font-black text-white tracking-tight">
                Koin<span className="text-[#2D5BFF]">X</span>
              </h1>
              <span className="hidden md:inline-block text-xs font-semibold px-2 py-0.5 rounded-md bg-white/10 text-white/70">
                Tax Tool
              </span>
            </div>
          </div>

          {/* Action Tools / Dev Debug Simulator */}
          <div className="flex items-center gap-3">
            <button
              onClick={simulateError}
              className="text-xs px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300 font-semibold hover:bg-rose-500/20 transition-all cursor-pointer hidden sm:block"
              title="Simulate API Failure to test error state"
            >
              ⚡ Test API Error
            </button>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-medium text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>FY 2025-26</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Page Intro Banner */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Tax Loss Harvesting
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Harvest your unrealised crypto losses to offset capital gains and lower your tax liability.
            Select assets with negative returns to preview your instant tax savings below.
          </p>
        </div>

        {/* Error Banner State */}
        {error && (
          <div className="mb-8 bg-rose-950/40 border border-rose-500/50 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-rose-200 animate-in fade-in duration-300 shadow-xl">
            <div className="flex items-start gap-3.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 text-rose-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-rose-100">API Connection Error</h4>
                <p className="text-sm mt-1 text-rose-300/80">{error}</p>
              </div>
            </div>
            <button
              onClick={retryFetch}
              className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm transition-all shrink-0 shadow-lg shadow-rose-500/20 cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* TOP SECTION: Two Summary Cards Side by Side */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          <CapitalGainsCard
            title="Before Harvesting"
            variant="before"
            capitalGains={baseCapitalGains}
            loading={loading}
          />
          <CapitalGainsCard
            title="After Harvesting"
            variant="after"
            capitalGains={harvestedCapitalGains}
            savings={savings}
            loading={loading}
          />
        </section>

        {/* BOTTOM SECTION: Holdings Table */}
        <section>
          <HoldingsTable />
        </section>
      </main>
    </div>
  );
};
