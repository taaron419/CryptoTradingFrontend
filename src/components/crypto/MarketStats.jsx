import Card from "../common/Card";
import { formatCurrency, formatLarge } from "../../data/coins";

const renderStat = (value, formatter) =>
  value === undefined || value === null ? "--" : formatter(value);

const MarketStats = ({ coin }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-slate-900">Market stats</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Market cap</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{renderStat(coin.marketCap, formatLarge)}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">24h volume</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{renderStat(coin.volume24h, formatLarge)}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Circulating supply</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{coin.supply || "--"}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">All-time high</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{renderStat(coin.allTimeHigh, formatCurrency)}</p>
        </div>
      </div>
    </Card>
  );
};

export default MarketStats;
