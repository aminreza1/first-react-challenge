import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./contexts/auth-context/auth-context";
import CartContextProvider from "./contexts/cart-context/cart-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </AuthContextProvider>
);
