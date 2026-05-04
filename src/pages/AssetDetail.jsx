import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import PriceChart from "../components/crypto/PriceChart";
import MarketStats from "../components/crypto/MarketStats";
import useCrypto from "../hooks/useCrypto";
import { formatCurrency } from "../data/coins";

const timeframes = ["1H", "24H", "7D", "1M", "1Y"];

const AssetDetail = () => {
  const { symbol } = useParams();
  const { coins } = useCrypto();
  const [activeFrame, setActiveFrame] = useState("24H");

  const coin = useMemo(
    () => coins.find((item) => item.symbol.toLowerCase() === symbol?.toLowerCase()),
    [coins, symbol],
  );

  if (!coin) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900">Asset not found</h1>
        <Link to="/explore" className="mt-3 inline-block text-sm font-semibold text-[#0052ff]">Back to explore</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/explore" className="text-sm font-semibold text-[#0052ff]">? Back to Explore</Link>

      <Card className="mt-4 p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              {coin.name} <span className="text-slate-500">{coin.symbol}</span>
            </h1>
            <p className="mt-2 text-4xl font-semibold text-slate-900">{formatCurrency(coin.price)}</p>
            <p className={`mt-1 text-sm font-medium ${coin.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {coin.change24h >= 0 ? "+" : ""}
              {coin.change24h.toFixed(2)}% (24h)
            </p>
          </div>

          <div className="flex gap-2">
            {timeframes.map((frame) => (
              <Button
                key={frame}
                type="button"
                variant={activeFrame === frame ? "primary" : "secondary"}
                onClick={() => setActiveFrame(frame)}
                className="rounded-full px-4 py-2 text-xs"
              >
                {frame}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <PriceChart data={coin.histories?.[activeFrame] || []} />
        </div>
      </Card>

      <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <MarketStats coin={coin} />

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900">Buy {coin.symbol}</h2>
          <p className="mt-2 text-sm text-slate-600">Simulated purchase widget (frontend only).</p>
          <label htmlFor="buy-amount" className="mt-5 block text-sm font-medium text-slate-700">Amount (USD)</label>
          <Input id="buy-amount" type="number" min="10" defaultValue="100" className="mt-2" />
          <Button type="button" className="mt-4 w-full py-3">Buy now</Button>
        </Card>
      </section>
    </main>
  );
};

export default AssetDetail;
