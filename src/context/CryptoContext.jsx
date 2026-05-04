import { useCallback, useEffect, useMemo, useState } from "react";
import CryptoContext from "./CryptoContextValue";
import { coins as fallbackCoins } from "../data/coins";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const normalizeCoin = (coin, index) => ({
  ...coin,
  rank: coin.rank || index + 1,
  symbol: coin.symbol?.toUpperCase() || "",
  price: Number(coin.price) || 0,
  change24h: Number(coin.change24h) || 0,
});

const fetchCryptoList = async (path = "/crypto") => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Crypto request failed with ${response.status}`);
  }

  const payload = await response.json();
  const list = Array.isArray(payload.data) ? payload.data : payload;

  return list.map(normalizeCoin);
};

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState(fallbackCoins);
  const [topGainers, setTopGainers] = useState([]);
  const [newListings, setNewListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const loadCrypto = useCallback(async () => {
    try {
      const [tradableData, gainerData, newData] = await Promise.all([
        fetchCryptoList("/crypto"),
        fetchCryptoList("/crypto/gainers"),
        fetchCryptoList("/crypto/new"),
      ]);

      setCoins(tradableData);
      setTopGainers(gainerData);
      setNewListings(newData);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCrypto = useCallback(
    async (cryptoData) => {
      const token = localStorage.getItem("coinbaseToken");

      if (!token) {
        throw new Error("Please sign in before adding a cryptocurrency.");
      }

      const response = await fetch(`${API_BASE_URL}/crypto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(cryptoData),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to add cryptocurrency.");
      }

      await loadCrypto();
      return payload;
    },
    [loadCrypto],
  );

  useEffect(() => {
    loadCrypto();
    const intervalId = window.setInterval(loadCrypto, 30000);

    return () => window.clearInterval(intervalId);
  }, [loadCrypto]);

  // Shared filtered list used across pages.
  const filteredCoins = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();
    if (!search) return coins;

    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search),
    );
  }, [coins, searchQuery]);

  const value = useMemo(
    () => ({
      coins,
      filteredCoins,
      topGainers,
      newListings,
      isLoading,
      error,
      refreshCrypto: loadCrypto,
      createCrypto,
      searchQuery,
      setSearchQuery,
    }),
    [
      coins,
      filteredCoins,
      topGainers,
      newListings,
      isLoading,
      error,
      loadCrypto,
      createCrypto,
      searchQuery,
    ],
  );

  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>;
};
