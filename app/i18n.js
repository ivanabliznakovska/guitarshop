"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext(null);

const STRINGS = {
  en: {
    brands: "Brands",
    loadingBrands: "Loading brands…",
    loadingModels: "Loading models…",
    loadingModel: "Loading model…",
    modelsForBrand: (id) => `Models for brand ${id}`,
    searchPlaceholder: "Search models by name…",
    allTypes: "All types",
    noModelsForFilter: "No models for this search/filter.",
    loadMore: "Load more",
    unnamedModel: "Unnamed model",
    type: "Type",
    price: "Price",
    noData: "No data.",
    specs: "Specs",
    musicians: "Musicians",
    show2more: "Show 2 more",
  },
  mk: {
    brands: "Брендови",
    loadingBrands: "Се вчитуваат брендови…",
    loadingModels: "Се вчитуваат модели…",
    loadingModel: "Се вчитува модел…",
    modelsForBrand: (id) => `Модели за бренд ${id}`,
    searchPlaceholder: "Барај модели по име…",
    allTypes: "Сите типови",
    noModelsForFilter: "Нема модели за ова пребарување/филтер.",
    loadMore: "Прикажи повеќе",
    unnamedModel: "Неименуван модел",
    type: "Тип",
    price: "Цена",
    noData: "Нема податоци.",
    specs: "Спецификации",
    musicians: "Музичари",
    show2more: "Прикажи уште 2",
  },
  sq: {
    brands: "Brendet",
    loadingBrands: "Po ngarkohen brendet…",
    loadingModels: "Po ngarkohen modelet…",
    loadingModel: "Po ngarkohet modeli…",
    modelsForBrand: (id) => `Modelet për brendin ${id}`,
    searchPlaceholder: "Kërko modele sipas emrit…",
    allTypes: "Të gjitha llojet",
    noModelsForFilter: "Nuk ka modele për këtë kërkim/filter.",
    loadMore: "Shfaq më shumë",
    unnamedModel: "Model pa emër",
    type: "Lloj",
    price: "Çmimi",
    noData: "S'ka të dhëna.",
    specs: "Specifikat",
    musicians: "Muzikantë",
    show2more: "Shfaq edhe 2",
  },
};

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved && STRINGS[saved]) setLang(saved);
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
  }, [lang]);


  const t = useMemo(() => {
    return (key, ...args) => {
      const dict = STRINGS[lang] || STRINGS.en;
      const v = dict[key] ?? STRINGS.en[key] ?? key;
      return typeof v === "function" ? v(...args) : v;
    };
  }, [lang]);


  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
