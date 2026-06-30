import { createFileRoute } from "@tanstack/react-router";
import { TaxHarvestingProvider } from "../context/TaxHarvestingContext";
import { TaxHarvestingDashboard } from "../components/TaxHarvestingDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KoinX | Crypto Tax Loss Harvesting Tool" },
      { name: "description", content: "Harvest your crypto losses to offset capital gains and save on taxes with KoinX." },
      { property: "og:title", content: "KoinX | Crypto Tax Loss Harvesting Tool" },
      { property: "og:description", content: "Harvest your crypto losses to offset capital gains and save on taxes with KoinX." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <TaxHarvestingProvider>
      <TaxHarvestingDashboard />
    </TaxHarvestingProvider>
  );
}
