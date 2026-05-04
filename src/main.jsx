import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CryptoProvider } from "./context/CryptoContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </StrictMode>,
);
