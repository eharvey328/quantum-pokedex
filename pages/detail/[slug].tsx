import Head from "next/head";
import { useRouter } from "next/router";

import { DetailView, Layout } from "../../components";

export default function DetailPage() {
  const router = useRouter();
  const slugParam = router.query.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug) return <p>Pokemon not foud</p>;

  return (
    <>
      <Head>
        <title>
          Pokédex Details | {slug.replace(/(^|\s)\S/g, (t) => t.toUpperCase())}
        </title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Layout>
        <h1>Details</h1>
        <DetailView slug={slug} />
      </Layout>
    </>
  );
}
