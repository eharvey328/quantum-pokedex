import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { DetailView } from "@components/DetailView";
import { Button, Icon, Layout } from "@components/shared";
import { normalizeQueryParam } from "@lib/utils";

export default function DetailPage() {
  const router = useRouter();
  const slug = normalizeQueryParam(router.query.slug);

  useEffect(() => {
    router.prefetch("/");
    // Because prefetch is used as a the function to call, and not as an arg,
    // there is no need to pass it in the dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!slug) return <p>Pokémon not foud</p>;

  return (
    <Layout size="sm">
      <Link href="/">
        <Button>
          <Icon name="back" />
        </Button>
      </Link>
      <DetailView slug={slug ?? ""} />
    </Layout>
  );
}
