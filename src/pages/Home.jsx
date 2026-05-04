import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";
import Input from "../components/common/Input";
import useCrypto from "../hooks/useCrypto";
import heroImage from "../assets/site/hero.avif";
import advancedImage from "../assets/site/advanced.avif";
import zeroFeesImage from "../assets/site/zero-fees.avif";
import baseAppImage from "../assets/site/cb-lolp.avif";
import learnBitcoinImage from "../assets/site/learn-bitcoin.avif";
import replaceBankImage from "../assets/site/replace-bank.avif";
import cryptoCoinsLearningImage from "../assets/site/crypto-coins-learning.png";
import portfolioCoinsImage from "../assets/site/portfolio-coins.avif";

const learningCards = [
  {
    title: "USDC: The digital dollar for the global crypto economy",
    body: "Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more equitable...",
    image: cryptoCoinsLearningImage,
  },
  {
    title: "Can crypto really replace your bank account?",
    body: "If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\" - the idea being that...",
    image: replaceBankImage,
  },
  {
    title: "When is the best time to invest in crypto?",
    body: "Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause...",
    image: learnBitcoinImage,
  },
];

const assetTabs = [
  { id: "tradable", label: "Tradable" },
  { id: "gainers", label: "Top gainers" },
  { id: "new", label: "New on Coinbase" },
  { id: "add", label: "Add new cryptocurrency" },
];

const formatGhs = (value) =>
  new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    currencyDisplay: "code",
    maximumFractionDigits: value < 1 ? 4 : 2,
  })
    .format(value)
    .replace("GHS", "GHS ");

const CryptoIcon = ({ coin }) => {
  const symbol = coin.symbol?.slice(0, 1) || "?";

  return coin.image ? (
    <img
      src={coin.image}
      alt=""
      className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
    />
  ) : (
    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#2b3038] text-lg font-semibold text-white sm:h-14 sm:w-14">
      {symbol}
    </span>
  );
};

const Home = () => {
  const { coins, topGainers, newListings, isLoading, error, createCrypto } =
    useCrypto();
  const topCoins = coins.slice(0, 5);
  const [activeAssetTab, setActiveAssetTab] = useState("tradable");
  const [cryptoForm, setCryptoForm] = useState({
    name: "",
    symbol: "",
    price: "",
    image: "",
    change24h: "",
  });
  const [cryptoFormStatus, setCryptoFormStatus] = useState({
    type: "",
    message: "",
  });
  const [isCreatingCrypto, setIsCreatingCrypto] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("coinbaseToken")),
  );
  const [heroEmail, setHeroEmail] = useState("");

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("coinbaseToken")));
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("coinbase-auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("coinbase-auth-change", syncAuth);
    };
  }, []);

  const displayedAssets =
    activeAssetTab === "gainers"
      ? topGainers
      : activeAssetTab === "new"
        ? newListings
        : topCoins;

  const handleCryptoFormChange = (event) => {
    const { name, value } = event.target;

    setCryptoForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCryptoImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setCryptoForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleCreateCrypto = async (event) => {
    event.preventDefault();
    setCryptoFormStatus({ type: "", message: "" });
    setIsCreatingCrypto(true);

    try {
      const payload = await createCrypto({
        name: cryptoForm.name.trim(),
        symbol: cryptoForm.symbol.trim().toUpperCase(),
        price: Number(cryptoForm.price),
        image: cryptoForm.image.trim(),
        change24h: Number(cryptoForm.change24h),
      });

      setCryptoForm({
        name: "",
        symbol: "",
        price: "",
        image: "",
        change24h: "",
      });
      setCryptoFormStatus({
        type: "success",
        message:
          payload.message ||
          `${cryptoForm.name.trim()} was added to the database successfully.`,
      });
      setActiveAssetTab("new");
    } catch (requestError) {
      setCryptoFormStatus({
        type: "error",
        message: requestError.message,
      });
    } finally {
      setIsCreatingCrypto(false);
    }
  };

  return (
    <main className="overflow-x-clip bg-white">
      <section className="px-6 pb-16 pt-16 sm:px-10 lg:px-[60px] lg:pb-20 lg:pt-[64px]">
        <div className="max-w-[1770px]">
          <h1 className="max-w-[1220px] text-[clamp(2.75rem,5.2vw,5.95rem)] font-normal leading-[1.02] text-black">
            The future of finance is here.
          </h1>
          <p className="mt-9 max-w-3xl text-[clamp(1.25rem,1.55vw,1.85rem)] leading-snug text-black">
            Trade crypto and more on a platform you can trust.
          </p>
          {!isAuthenticated ? (
            <div className="mt-10 grid w-full max-w-[820px] grid-cols-1 gap-4 sm:grid-cols-[596px_auto] sm:items-center sm:gap-[26px]">
              <Input
                type="email"
                placeholder="satoshi@nakamoto.com"
                value={heroEmail}
                onChange={(event) => setHeroEmail(event.target.value)}
                className="h-[86px] rounded-xl border-slate-400 px-6 text-[1.5rem] text-slate-800 placeholder:text-slate-500"
              />
              <Link
                to={`/signup${heroEmail.trim() ? `?email=${encodeURIComponent(heroEmail.trim())}` : ""}`}
              >
                <Button className="h-[88px] w-full rounded-full px-12 text-[1.75rem] font-semibold sm:w-auto">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : null}
          <div className="mt-[50px] w-full max-w-[1770px] overflow-hidden rounded-[44px] bg-[#062a91] sm:rounded-[68px]">
            <img
              src={heroImage}
              alt="Coinbase app preview"
              className="h-[340px] w-full object-cover object-top sm:h-[520px] lg:h-[660px]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1850px] px-6 py-16 sm:px-10 lg:px-[56px]">
        <div>
          <h2 className="max-w-[1420px] text-[clamp(2.75rem,4.2vw,4.6rem)] font-normal leading-tight text-black">
            Explore crypto like Bitcoin, Ethereum, and Dogecoin.
          </h2>
          <p className="mt-6 text-[clamp(1.25rem,1.5vw,1.7rem)] leading-snug text-slate-600">
            Simply and securely buy, sell, and manage hundreds of
            cryptocurrencies.
          </p>
          <button
            type="button"
            className="mt-9 rounded-full bg-black px-10 py-5 text-xl font-semibold text-white hover:bg-slate-900"
          >
            See more assets
          </button>
        </div>

        <div className="mt-12 overflow-hidden rounded-[28px] bg-[#08090b] px-5 py-8 text-white sm:rounded-[44px] sm:px-12 sm:py-12 lg:px-[60px]">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            {assetTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAssetTab(tab.id)}
                className={`rounded-full px-6 py-3 text-base font-semibold transition sm:px-9 sm:text-lg ${
                  activeAssetTab === tab.id
                    ? "bg-[#2b2f38] text-white"
                    : "text-white hover:bg-[#17191f]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-10">
            {activeAssetTab === "add" ? (
              <form
                className="grid gap-5 rounded-[24px] bg-[#08090b] p-0 text-white sm:grid-cols-2"
                onSubmit={handleCreateCrypto}
              >
                <div className="sm:col-span-2">
                  <h3 className="text-2xl font-semibold">
                    Add new cryptocurrency
                  </h3>
                </div>

                <label className="block text-sm font-semibold text-white">
                  Name
                  <input
                    name="name"
                    value={cryptoForm.name}
                    onChange={handleCryptoFormChange}
                    required
                    className="mt-2 h-16 w-full rounded-2xl border border-white/10 bg-[#15171c] px-6 text-lg text-white outline-none placeholder:text-slate-500 focus:border-[#0052ff]"
                    placeholder="Bitcoin"
                  />
                </label>

                <label className="block text-sm font-semibold text-white">
                  Symbol
                  <input
                    name="symbol"
                    value={cryptoForm.symbol}
                    onChange={handleCryptoFormChange}
                    required
                    className="mt-2 h-16 w-full rounded-2xl border border-white/10 bg-[#15171c] px-6 text-lg uppercase text-white outline-none placeholder:text-slate-500 focus:border-[#0052ff]"
                    placeholder="BTC"
                  />
                </label>

                <label className="block text-sm font-semibold text-white">
                  Price
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="any"
                    value={cryptoForm.price}
                    onChange={handleCryptoFormChange}
                    required
                    className="mt-2 h-16 w-full rounded-2xl border border-white/10 bg-[#15171c] px-6 text-lg text-white outline-none placeholder:text-slate-500 focus:border-[#0052ff]"
                    placeholder="64200"
                  />
                </label>

                <label className="block text-sm font-semibold text-white">
                  24h Change
                  <input
                    name="change24h"
                    type="number"
                    step="any"
                    value={cryptoForm.change24h}
                    onChange={handleCryptoFormChange}
                    required
                    className="mt-2 h-16 w-full rounded-2xl border border-white/10 bg-[#15171c] px-6 text-lg text-white outline-none placeholder:text-slate-500 focus:border-[#0052ff]"
                    placeholder="2.5"
                  />
                </label>

                <label className="block text-sm font-semibold text-white sm:col-span-2">
                  Image
                  <div className="mt-2 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#15171c] p-4 sm:flex-row sm:items-center">
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleCryptoImageChange}
                      required={!cryptoForm.image}
                      className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-5 file:py-3 file:text-sm file:font-semibold file:text-black hover:file:bg-slate-100"
                    />
                    {cryptoForm.image ? (
                      <img
                        src={cryptoForm.image}
                        alt=""
                        className="h-14 w-14 rounded-full bg-black object-cover"
                      />
                    ) : null}
                  </div>
                </label>

                {cryptoFormStatus.message ? (
                  <p
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold sm:col-span-2 ${
                      cryptoFormStatus.type === "success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {cryptoFormStatus.message}
                  </p>
                ) : null}

                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    disabled={isCreatingCrypto}
                    className="w-full rounded-full py-3 text-base disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
                  >
                    {isCreatingCrypto ? "Adding cryptocurrency..." : "Add cryptocurrency"}
                  </Button>
                </div>
              </form>
            ) : null}
            {activeAssetTab !== "add" && isLoading ? (
              <div className="py-8 text-center text-lg text-slate-300">
                Loading live prices...
              </div>
            ) : null}
            {activeAssetTab !== "add" && !isLoading && error ? (
              <div className="rounded-2xl bg-white/10 px-5 py-4 text-sm text-slate-200">
                Live backend prices could not refresh. Showing the latest
                available data.
              </div>
            ) : null}
            {activeAssetTab !== "add" && !isLoading && displayedAssets.length === 0 ? (
              <div className="py-8 text-center text-lg text-slate-300">
                No crypto assets found.
              </div>
            ) : null}
            {activeAssetTab !== "add" && displayedAssets.map((coin) => {
              const isPositive = coin.change24h > 0;
              const isNegative = coin.change24h < 0;

              return (
                <Link
                  key={coin._id || coin.symbol}
                  to={`/assets/${coin.symbol}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-5 text-white"
                >
                  <span className="flex min-w-0 items-center gap-5 sm:gap-6">
                    <CryptoIcon coin={coin} />
                    <span className="truncate text-[2rem] font-normal leading-none sm:text-[3rem]">
                      {coin.name}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[1.45rem] leading-none sm:text-[2.25rem]">
                      {formatGhs(coin.price)}
                    </span>
                    <span
                      className={`mt-2 block text-lg font-medium leading-none sm:text-[1.65rem] ${
                        isPositive
                          ? "text-emerald-400"
                          : isNegative
                            ? "text-rose-400"
                            : "text-slate-400"
                      }`}
                    >
                      {isPositive ? "↗ " : isNegative ? "↙ " : ""}
                      {coin.change24h
                        ? `${Math.abs(coin.change24h).toFixed(2)}%`
                        : "--"}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1850px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[0.98fr_1fr] lg:items-center lg:px-[64px] lg:py-14">
        <div className="grid min-h-[430px] overflow-hidden rounded-[42px] bg-[#08090b] px-8 py-12 sm:min-h-[560px] sm:px-12 lg:min-h-[690px] lg:px-8 lg:py-14">
          <img
            src={advancedImage}
            alt="Coinbase Advanced trading screens"
            className="m-auto w-full max-w-[850px] object-contain"
          />
        </div>

        <div className="lg:pl-1">
          <h2 className="max-w-[760px] text-[clamp(2.75rem,4vw,4.45rem)] font-normal leading-[1.08] text-black">
            Powerful tools, designed for the advanced trader.
          </h2>
          <p className="mt-10 max-w-[930px] text-[clamp(1.15rem,1.45vw,1.55rem)] leading-[1.45] text-[#4f5d73]">
            Powerful analytical tools with the safety and security of Coinbase
            deliver the ultimate trading experience. Tap into sophisticated
            charting capabilities, real-time order books, and deep liquidity
            across hundreds of markets.
          </p>
          <button
            type="button"
            className="mt-10 rounded-full bg-[#08090b] px-12 py-6 text-[1.55rem] font-semibold text-white transition hover:bg-[#0052ff]"
          >
            Start trading
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1850px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[0.98fr_1fr] lg:items-center lg:px-[58px] lg:py-20">
        <div>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-300 px-5 py-4 text-[1.45rem] font-medium tracking-wide text-[#4f5d73]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#08090b] text-[13px] font-bold text-white">
              C
            </span>
            <span>COINBASE ONE</span>
          </div>
          <h2 className="mt-12 max-w-[620px] text-[clamp(3rem,4vw,4.55rem)] font-normal leading-[1.08] text-black">
            Zero trading fees, more rewards.
          </h2>
          <p className="mt-10 max-w-[870px] text-[clamp(1.3rem,1.55vw,1.7rem)] leading-[1.45] text-[#4f5d73]">
            Get more out of crypto with one membership: zero trading fees,
            boosted rewards, priority support, and more.
          </p>
          <button
            type="button"
            className="mt-10 rounded-full bg-[#08090b] px-12 py-6 text-[1.6rem] font-semibold text-white transition hover:bg-[#0052ff]"
          >
            Claim free trial
          </button>
        </div>

        <div className="overflow-hidden rounded-[64px] bg-[#eef1f5] px-6 pt-12 sm:px-12 lg:px-16 lg:pt-12">
          <img
            src={zeroFeesImage}
            alt="Coinbase One zero trading fees app screen"
            className="mx-auto w-full max-w-[620px] object-contain"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1850px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[0.98fr_1fr] lg:items-center lg:px-[58px] lg:py-20">
        <div className="overflow-hidden rounded-[64px] bg-[#eef1f5] px-8 pt-10 sm:px-12 lg:px-16 lg:pt-10">
          <img
            src={baseAppImage}
            alt="Base App phone screen"
            className="mx-auto w-full max-w-[560px] object-contain"
          />
        </div>

        <div>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-300 px-5 py-4 text-[1.45rem] font-medium tracking-wide text-[#4f5d73]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#08090b] text-[13px] font-bold text-white">
              C
            </span>
            <span>BASE APP</span>
          </div>
          <h2 className="mt-12 max-w-[850px] text-[clamp(3rem,4vw,4.55rem)] font-normal leading-[1.08] text-black">
            Countless ways to earn crypto with the Base App.
          </h2>
          <p className="mt-10 max-w-[920px] text-[clamp(1.3rem,1.55vw,1.7rem)] leading-[1.45] text-[#4f5d73]">
            An everything app to trade, create, discover, and chat, all in one
            place.
          </p>
          <button
            type="button"
            className="mt-10 rounded-full bg-[#08090b] px-12 py-6 text-[1.6rem] font-semibold text-white transition hover:bg-[#0052ff]"
          >
            Learn more
          </button>
        </div>
      </section>

      <section className="bg-[#eef1f5] px-6 py-16 sm:px-10 lg:px-[58px] lg:py-20">
        <div className="mx-auto max-w-[1850px]">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <h2 className="max-w-[820px] text-[clamp(3.6rem,5.4vw,6rem)] font-normal leading-[1.02] text-black">
              New to crypto? Learn some crypto basics
            </h2>
            <div className="lg:pt-4">
              <p className="max-w-[820px] text-[clamp(1.5rem,1.8vw,2rem)] leading-[1.35] text-[#4f5d73]">
                Beginner guides, practical tips, and market updates for
                first-timers, experienced investors, and everyone in between
              </p>
              <button
                type="button"
                className="mt-10 rounded-full bg-[#08090b] px-12 py-6 text-[1.6rem] font-semibold text-white transition hover:bg-[#0052ff]"
              >
                Read More
              </button>
            </div>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {learningCards.map((card) => (
              <article key={card.title}>
                <div className="aspect-[1.78] overflow-hidden rounded-[44px] bg-white">
                  <img
                    src={card.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-9 text-[clamp(2rem,2.7vw,2.9rem)] font-normal leading-[1.16] text-black">
                  <a
                    href="#"
                    className="border-b-2 border-transparent transition hover:border-black"
                  >
                    {card.title}
                  </a>
                </h3>
                <p className="mt-8 text-[clamp(1.2rem,1.45vw,1.65rem)] leading-[1.35] text-[#4f5d73]">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-10 lg:px-[64px] lg:py-24">
        <div className="max-w-[1320px]">
          <h2 className="text-[clamp(4rem,7vw,7.2rem)] font-normal leading-[1.02] text-black">
            Take control of your money
          </h2>
          <p className="mt-10 text-[clamp(1.45rem,1.9vw,2rem)] leading-snug text-black">
            Start your portfolio today and discover crypto
          </p>
          {!isAuthenticated ? (
            <div className="mt-10 grid max-w-[820px] grid-cols-1 gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <Input
                type="email"
                placeholder="satoshi@nakamoto.com"
                value={heroEmail}
                onChange={(event) => setHeroEmail(event.target.value)}
                className="h-[86px] rounded-xl border-slate-400 px-6 text-[1.5rem] text-slate-800 placeholder:text-slate-500"
              />
              <Link
                to={`/signup${heroEmail.trim() ? `?email=${encodeURIComponent(heroEmail.trim())}` : ""}`}
              >
                <Button className="h-[88px] w-full rounded-full px-12 text-[1.75rem] font-semibold sm:w-auto">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto h-[760px] max-w-[1850px] overflow-hidden sm:h-[880px] lg:h-[1180px]">
          <img
            src={portfolioCoinsImage}
            alt="Crypto asset symbols"
            className="mx-auto h-full w-full object-cover object-top"
          />
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-center sm:px-10 lg:px-[64px] lg:py-24">
        <div className="mx-auto max-w-[1320px] space-y-9 text-[clamp(1rem,1.25vw,1.45rem)] leading-[1.45] text-[#4f5d73]">
          <p>DEX trading is offered by Coinbase Bermuda Technologies Ltd.</p>
          <p>
            Products and features may not be available in all regions.
            Information is for informational purposes only, and is not (i) an
            offer, or solicitation of an offer, to invest in, or to buy or sell,
            any interests or shares, or to participate in any investment or
            trading strategy or (ii) intended to provide accounting, legal, or
            tax advice, or investment recommendations. Trading cryptocurrency
            comes with risk.
          </p>
        </div>
      </section>

    </main>
  );
};

export default Home;
