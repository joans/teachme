import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { LikeContextProvider } from "./store/like-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LikeContextProvider>
        <Router basename={`/${process.env.PUBLIC_URL}`}>
          <App />
        </Router>
      </LikeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
