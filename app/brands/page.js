"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { useI18n } from "../i18n";

const QUERY_BRANDS = gql`
  query Brands { findAllBrands { id name } }
`;

export default function BrandsPage() {
  const { t } = useI18n();
  const { data, loading, error } = useQuery(QUERY_BRANDS);

  if (loading) return <main style={{ padding: 16 }}>{t("loadingBrands")}</main>;
  if (error)   return <main style={{ padding: 16, color: "crimson" }}>{error.message}</main>;

  const list = data?.findAllBrands ?? [];
  return (
    <main style={{ padding: 16 }}>
      <h2>{t("brands")}</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12 }}>
        {list.map((b) => (
          <Link key={b.id} href={`/brands/${encodeURIComponent(b.id)}`}
                style={{ border:"1px solid #eee", borderRadius:8, padding:12, textDecoration:"none" }}>
            {b.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
