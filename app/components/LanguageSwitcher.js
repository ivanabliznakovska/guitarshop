"use client";
import { useI18n } from "../i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  const Btn = ({ code, label }) => (
    <button
      className={`tab-button ${lang === code ? "active" : ""}`}
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      type="button"
    >
      {label}
    </button>
  );

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Btn code="en" label="EN" />
      <Btn code="mk" label="MK" />
      <Btn code="sq" label="SQ" />
    </div>
  );
}
