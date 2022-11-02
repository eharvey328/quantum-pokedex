import { ApolloProvider } from "@apollo/client";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import type { AppProps } from "next/app";
import Head from "next/head";

import "../src/styles/global.scss";

import { client } from "../src/lib/apollo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#FFF" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <CssVarsProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </CssVarsProvider>
      </ApolloProvider>
    </>
  );
}
