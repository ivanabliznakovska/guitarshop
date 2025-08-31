"use client";

import { gql, useQuery } from "@apollo/client";
import { use } from "react";
import ModelClient from "./ModelClient";
import { useI18n } from "../../../i18n";

const QUERY_MODEL = gql`
  query OneModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians { name }
    }
  }
`;

export default function ModelPage(props) {
  const { t } = useI18n();
  const { brandId, modelId } = use(props.params);

  const { data, loading, error } = useQuery(QUERY_MODEL, {
    variables: { brandId: String(brandId), modelId: String(modelId) },
  });

  if (loading) return <main style={{ padding: 16 }}>{t("loadingModel")}</main>;
  if (error) {
    const msg =
      error.networkError?.result?.errors?.[0]?.message ||
      error.graphQLErrors?.[0]?.message ||
      error.message;
    return <main style={{ padding: 16, color: "crimson" }}>{String(msg)}</main>;
  }

  const m = data?.findUniqueModel;
  if (!m) return <main style={{ padding: 16 }}>{t("noData")}</main>;
  return <ModelClient model={m} />;
}
