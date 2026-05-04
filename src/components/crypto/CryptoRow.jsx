import { Link } from "react-router-dom";
import { formatCurrency, formatLarge } from "../../data/coins";

const CryptoRow = ({ coin }) => {
  return (
    <tr className="border-t border-slate-100">
      <td className="px-4 py-3 text-slate-600">{coin.rank}</td>
      <td className="px-4 py-3">
        <Link to={`/assets/${coin.symbol}`} className="font-medium text-slate-900 hover:text-[#0052ff]">
          {coin.name} <span className="ml-1 text-slate-500">{coin.symbol}</span>
        </Link>
      </td>
      <td className="px-4 py-3 text-slate-900">{formatCurrency(coin.price)}</td>
      <td className={`px-4 py-3 font-medium ${coin.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
        {coin.change24h >= 0 ? "+" : ""}
        {coin.change24h.toFixed(2)}%
      </td>
      <td className="px-4 py-3 text-slate-700">{formatLarge(coin.marketCap)}</td>
    </tr>
  );
};

export default CryptoRow;
