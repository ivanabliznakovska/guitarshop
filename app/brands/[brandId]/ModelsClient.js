"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useI18n } from "../../i18n";
import SafeImg from "../../components/SafeImg";

export default function ModelsClient({ models, brandId }) {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const types = useMemo(
    () => Array.from(new Set((models || []).map((m) => m?.type).filter(Boolean))),
    [models]
  );

  const filtered = useMemo(() => {
    let list = Array.isArray(models) ? models : [];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((m) => (m?.name || "").toLowerCase().includes(q));
    }
    if (typeFilter) list = list.filter((m) => m?.type === typeFilter);
    return list;
  }, [models, search, typeFilter]);

  return (
    <main style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>{t("modelsForBrand", brandId)}</h2>

      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        <input
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex:1, padding:8, border:"1px solid #bbb", borderRadius:6 }}
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ padding:8, borderRadius:6 }}
        >
          <option value="">{t("allTypes")}</option>
          {types.map((topt) => <option key={topt} value={topt}>{topt}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding:16, border:"1px dashed #bbb", borderRadius:8 }}>
          {t("noModelsForFilter")}
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))", gap:16 }}>
          {filtered.map((m) => (
            <Link key={m.id}
              href={`/brands/${encodeURIComponent(brandId)}/${encodeURIComponent(m.id)}`}
              style={{ border:"1px solid rgba(0,0,0,.15)", borderRadius:12, padding:12, textDecoration:"none", color:"inherit", background:"#fdf6" }}
            >
              <div style={{ fontWeight:700, marginBottom:4 }}>{m?.name || t("unnamedModel")}</div>
              <div style={{ opacity:.7, marginBottom:8 }}>{m?.type || ""}</div>
              <SafeImg src={m?.image} alt={m?.name} />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
