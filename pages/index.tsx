import Head from "next/head";
import { useRouter } from "next/router";

import { ListView } from "@components/ListView";
import { Layout } from "@components/shared";
import { normalizeQueryParam } from "@lib/utils";

export default function HomePage() {
  const { query } = useRouter();
  const search = normalizeQueryParam(query.q) ?? "";
  const type = normalizeQueryParam(query.type) ?? "";
  const favorite = normalizeQueryParam(query.favorite) ?? 0;

  return (
    <>
      <Head>
        <title>Pokédex</title>
        <meta
          name="description"
          content="Find any of your favorite gen 1 Pokémon."
        />
      </Head>

      <Layout>
        <h1 className="h1">Pokédex</h1>
        <ListView search={search} type={type} favorite={+favorite} />
      </Layout>
    </>
  );
}
