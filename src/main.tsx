import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
import { useLocalStorage } from "./utils/tools";
import { ConfigProvider } from "antd";

const uploadLink = createUploadLink({ uri: import.meta.env.VITE_API_ENDPOINT });

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const { getLocalStorage } = useLocalStorage();
  const token = getLocalStorage("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(ApolloLink.from([uploadLink, httpLink])),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#452dd3",
              // colorFillSecondary: "#9586eb",
              colorWarning: "#ff934b",
              colorError: "#f74360",
              colorSuccess: "#00c48c",
              colorInfoText: "#5487f5",
              colorTextBase: "#000000",
              colorTextSecondary: "#a5a3a8",
              colorBgBase: "#fafafa",
              // backgroundSurfacePrimary: "#ffffff",
              // backgroundSurfaceSecondary: "#fcf7ff",
              // backgroundSurfaceLight: "#efefef",
              // backgroundSurfaceDark: "#0d0635",
              // cardHeadHeight: "70px",
              // cardRadius: "20px",
              borderRadius: 6,
              borderRadiusSM: 6,
              controlItemBgHover: "rgba(69, 45, 211, 0.4)",
              controlItemBgActiveHover: "rgba(69, 45, 211, 0.4)",
              // borderStyleBase: "solid",
              // btnBorderRadiusBase: ,
              // menuItemActiveBg: "#452dd3",
              // menuHighlightColor: "#ffffff",
              // menuInlineToplevelItemHeight: "42px",
              // menuItemHeight: "42px",
              // menuItemColor: "rgba(0, 0, 0, 0.45)",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
