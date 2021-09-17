import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";

const flairQueryClient = new QueryClient({});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={flairQueryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
