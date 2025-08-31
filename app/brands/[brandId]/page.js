"use client";

import { gql, useQuery } from "@apollo/client";
import ModelsClient from "./ModelsClient";
import { use } from "react";
import { useI18n } from "../../i18n";

const QUERY_MODELS = gql`
  query BrandModels($id: ID!) {
    findBrandModels(id: $id, sortBy: { field: name, order: ASC }) {
      id
      name
      image
      type
    }
  }
`;

export default function BrandModelsPage(props) {
  const { t } = useI18n();
  const { brandId } = use(props.params);
  const id = String(brandId);

  const { data, loading, error } = useQuery(QUERY_MODELS, { variables: { id } });

  if (loading) return <main style={{ padding: 16 }}>{t("loadingModels")}</main>;
  if (error) {
    const msg =
      error.networkError?.result?.errors?.[0]?.message ||
      error.graphQLErrors?.[0]?.message ||
      error.message;
    return <main style={{ padding: 16, color: "crimson" }}>{String(msg)}</main>;
  }

  const models = data?.findBrandModels ?? [];
  return <ModelsClient models={models} brandId={id} />;
}
