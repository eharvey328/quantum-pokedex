import { ApolloProvider } from "@apollo/client";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import type { AppProps } from "next/app";
import Head from "next/head";

import { client } from "@lib/apollo";

import "@styles/global.scss";

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
