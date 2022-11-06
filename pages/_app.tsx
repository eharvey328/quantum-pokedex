import { ApolloProvider } from "@apollo/client";
import { Public_Sans } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";

import { client } from "@lib/apollo";
import Icons from "public/icons.svg";

import "@styles/global.scss";

// https://nextjs.org/docs/basic-features/font-optimization#apply-the-font-in-head
const fontLoader = Public_Sans({
  subsets: ["latin"],
  variable: "--default-font",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#FFF" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <style jsx global>{`
          html {
            font-family: ${fontLoader.style.fontFamily};
          }
        `}</style>
        <Icons />
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
