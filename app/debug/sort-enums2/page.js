"use client";
import { gql, useQuery } from "@apollo/client";

const INTROSPECT_ALL = gql`
  query {
    __schema {
      types {
        kind
        name
        enumValues { name }
      }
    }
  }
`;

export default function Page() {
  const { data, loading, error } = useQuery(INTROSPECT_ALL);
  if (loading) return <main style={{padding:16}}>Loading…</main>;
  if (error)   return <main style={{padding:16, color:"crimson"}}>{error.message}</main>;

  const types = data?.__schema?.types ?? [];
  const modelField = types.find(t => t.name === "ModelSortField");
  const sortOrder  = types.find(t => t.name === "SortOrder");

  return (
    <main style={{padding:16}}>
      <h3>ModelSortField enum values</h3>
      <pre>{JSON.stringify(modelField?.enumValues?.map(v=>v.name) ?? "(not found)", null, 2)}</pre>
      <h3>SortOrder enum values</h3>
      <pre>{JSON.stringify(sortOrder?.enumValues?.map(v=>v.name) ?? "(not found)", null, 2)}</pre>
    </main>
  );
}
