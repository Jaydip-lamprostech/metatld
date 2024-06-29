import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-tooltip/dist/react-tooltip.css";
import "@coinbase/onchainkit/styles.css";
import OnchainProviders from "./OnchainProviders";
import { ApolloProvider } from "@apollo/client";
import client from "./common/apolloClient";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <OnchainProviders>
        <App />
      </OnchainProviders>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
