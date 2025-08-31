"use client";
import { gql, useQuery } from "@apollo/client";

const INTROSPECTION = gql`
  query RootFields {
    __type(name: "Query") {
      fields { name }
    }
  }
`;

export default function Debug() {
  const { data, loading, error } = useQuery(INTROSPECTION);

  if (loading) return <main style={{padding:16}}>Loading…</main>;
  if (error)   return <main style={{padding:16, color:"crimson"}}>{error.message}</main>;

  const fields = data?.__type?.fields?.map(f => f.name) ?? [];
  return (
    <main style={{padding:16}}>
      <h2>Root query fields</h2>
      <ul>{fields.map(n => <li key={n}><code>{n}</code></li>)}</ul>
      <p style={{marginTop:12}}>Пронајди поле што личи на <b>brands / guitarBrands / allBrands</b>.</p>
    </main>
  );
}
