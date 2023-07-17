import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import React from "react";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);