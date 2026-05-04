import CryptoCard from "../components/crypto/CryptoCard";
import Input from "../components/common/Input";
import useCrypto from "../hooks/useCrypto";

const Explore = () => {
  const { filteredCoins, searchQuery, setSearchQuery } = useCrypto();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-slate-900">Explore crypto</h1>
      <p className="mt-2 text-slate-600">Track prices and open any asset for details.</p>

      <Input
        type="search"
        placeholder="Search by name or symbol"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="mt-6 max-w-md"
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCoins.map((coin) => (
          <CryptoCard key={coin.symbol} coin={coin} />
        ))}
      </div>
    </main>
  );
};

export default Explore;
