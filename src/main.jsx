import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import StoreContextProvider from "./components/contexts/StoreContextProvider.jsx";
import AuthContextProvider  from "./components/contexts/AuthContextProvider.jsx";

const container = document.getElementById("root");

createRoot(container).render(
  <StrictMode>
  <BrowserRouter>
  <AuthContextProvider>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </AuthContextProvider>
  </BrowserRouter>
  </StrictMode>
);
