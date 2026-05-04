import { Link } from "react-router-dom";
import Card from "../common/Card";
import { formatCurrency } from "../../data/coins";

const CryptoCard = ({ coin }) => {
  return (
    <Link to={`/assets/${coin.symbol}`}>
      <Card className="p-5 transition hover:-translate-y-0.5 hover:border-[#0052ff]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-900">{coin.name}</p>
            <p className="text-sm text-slate-500">{coin.symbol}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            #{coin.rank}
          </span>
        </div>

        <div className="mt-6">
          <p className="text-2xl font-semibold text-slate-900">{formatCurrency(coin.price)}</p>
          <p className={`mt-1 text-sm font-medium ${coin.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {coin.change24h >= 0 ? "+" : ""}
            {coin.change24h.toFixed(2)}% (24h)
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default CryptoCard;
