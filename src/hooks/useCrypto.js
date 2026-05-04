import { useContext } from "react";
import CryptoContext from "../context/CryptoContextValue";

const useCrypto = () => {
  const context = useContext(CryptoContext);

  if (!context) {
    throw new Error("useCrypto must be used inside CryptoProvider");
  }

  return context;
};

export default useCrypto;
