"use client";
import { useState } from "react";
import { useI18n } from "../../../i18n";
import SafeImg from "../../../components/SafeImg";

export default function ModelClient({ model }) {
  const { t } = useI18n();
  const [tab, setTab] = useState("specs");
  const [visible, setVisible] = useState(2);

  const specsList = [
    { label: "Body Wood",        value: model?.specs?.bodyWood },
    { label: "Neck Wood",        value: model?.specs?.neckWood },
    { label: "Fingerboard Wood", value: model?.specs?.fingerboardWood },
    { label: "Pickups",          value: model?.specs?.pickups },
    { label: "Tuners",           value: model?.specs?.tuners },
    { label: "Scale Length",     value: model?.specs?.scaleLength },
    { label: "Bridge",           value: model?.specs?.bridge },
  ].filter((s) => s.value);

  const musiciansList = Array.isArray(model?.musicians) ? model.musicians : [];
  const page = (tab === "specs" ? specsList : musiciansList).slice(0, visible);
  const hasMore = page.length < (tab === "specs" ? specsList.length : musiciansList.length);

  return (
    <main style={{ padding: 16, display: "grid", gap: 12 }}>
      <h2>{model?.name || t("unnamedModel")}</h2>
      <p>{t("type")}: {model?.type || "—"}</p>
      {model?.image && <SafeImg src={model.image} alt={model.name} style={{ height: 240 }} />}
      {model?.description && <p>{model.description}</p>}

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { setTab("specs"); setVisible(2); }} className={`tab-button ${tab === "specs" ? "active" : ""}`}>
          {t("specs")}
        </button>
        <button onClick={() => { setTab("musicians"); setVisible(2); }} className={`tab-button ${tab === "musicians" ? "active" : ""}`}>
          {t("musicians")}
        </button>
      </div>

      {page.length === 0 ? (
        <div style={{ padding: 12, border: "1px dashed #bbb" }}>{t("noData")}</div>
      ) : tab === "specs" ? (
        <ul style={{ paddingLeft: 16 }}>
          {page.map((s, i) => <li key={i}><b>{s.label}:</b> {s.value}</li>)}
        </ul>
      ) : (
        <ul style={{ paddingLeft: 16 }}>
          {page.map((u, i) => <li key={i}>{u?.name || "—"}</li>)}
        </ul>
      )}

      {hasMore && (
        <button onClick={() => setVisible(v => v + 2)} style={{ padding: "6px 12px" }}>
          {t("show2more")}
        </button>
      )}
    </main>
  );
}
