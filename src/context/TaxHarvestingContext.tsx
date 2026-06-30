import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { CapitalGains, Holding } from "../types/tax";
import { fetchCapitalGains, fetchHoldings } from "../data/mockApi";
import { applyHarvesting, netGains } from "../utils/calculations";

interface TaxHarvestingContextType {
  baseCapitalGains: CapitalGains | null;
  holdings: Holding[];
  selectedCoinIds: Set<string>;
  loading: boolean;
  error: string | null;
  toggleSelectCoin: (coin: string) => void;
  toggleSelectAll: () => void;
  retryFetch: () => void;
  simulateError: () => void;
  harvestedCapitalGains: CapitalGains | null;
  baseNetGains: { netSTCG: number; netLTCG: number; realised: number } | null;
  harvestedNetGains: { netSTCG: number; netLTCG: number; realised: number } | null;
  savings: number;
}

const TaxHarvestingContext = createContext<TaxHarvestingContextType | undefined>(undefined);

export const TaxHarvestingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [baseCapitalGains, setBaseCapitalGains] = useState<CapitalGains | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedCoinIds, setSelectedCoinIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [forceFail, setForceFail] = useState<boolean>(false);

  const loadData = async (shouldFail = false) => {
    setLoading(true);
    setError(null);
    try {
      const [gainsRes, holdingsRes] = await Promise.all([
        fetchCapitalGains(shouldFail),
        fetchHoldings(shouldFail),
      ]);
      setBaseCapitalGains(gainsRes);
      setHoldings(holdingsRes);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while loading data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(forceFail);
  }, [forceFail]);

  const retryFetch = () => {
    setForceFail(false);
    loadData(false);
  };

  const simulateError = () => {
    setForceFail(true);
  };

  const toggleSelectCoin = (coin: string) => {
    setSelectedCoinIds((prev) => {
      const next = new Set(prev);
      if (next.has(coin)) {
        next.delete(coin);
      } else {
        next.add(coin);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedCoinIds.size === holdings.length) {
      setSelectedCoinIds(new Set());
    } else {
      setSelectedCoinIds(new Set(holdings.map((h) => h.coin)));
    }
  };

  const harvestedCapitalGains = useMemo(() => {
    if (!baseCapitalGains) return null;
    return applyHarvesting(baseCapitalGains, holdings, selectedCoinIds);
  }, [baseCapitalGains, holdings, selectedCoinIds]);

  const baseNetGains = useMemo(() => {
    if (!baseCapitalGains) return null;
    return netGains(baseCapitalGains);
  }, [baseCapitalGains]);

  const harvestedNetGains = useMemo(() => {
    if (!harvestedCapitalGains) return null;
    return netGains(harvestedCapitalGains);
  }, [harvestedCapitalGains]);

  const savings = useMemo(() => {
    if (!baseNetGains || !harvestedNetGains) return 0;
    const diff = baseNetGains.realised - harvestedNetGains.realised;
    return diff > 0 ? diff : 0;
  }, [baseNetGains, harvestedNetGains]);

  return (
    <TaxHarvestingContext.Provider
      value={{
        baseCapitalGains,
        holdings,
        selectedCoinIds,
        loading,
        error,
        toggleSelectCoin,
        toggleSelectAll,
        retryFetch,
        simulateError,
        harvestedCapitalGains,
        baseNetGains,
        harvestedNetGains,
        savings,
      }}
    >
      {children}
    </TaxHarvestingContext.Provider>
  );
};

export const useTaxHarvesting = () => {
  const context = useContext(TaxHarvestingContext);
  if (!context) {
    throw new Error("useTaxHarvesting must be used within a TaxHarvestingProvider");
  }
  return context;
};
