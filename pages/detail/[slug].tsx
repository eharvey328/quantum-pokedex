import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Button, DetailView, Icon, Layout } from "@components";
import { normalizeQueryParam } from "@lib/utils";

export default function DetailPage() {
  const router = useRouter();
  const slug = normalizeQueryParam(router.query.slug);

  useEffect(() => {
    router.prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!slug) return <p>Pokémon not foud</p>;

  return (
    <Layout size="sm">
      <Link href="/">
        <Button style={{ marginBottom: "0.5rem" }}>
          <Icon name="back" />
        </Button>
      </Link>
      <DetailView slug={slug ?? ""} />
    </Layout>
  );
}
