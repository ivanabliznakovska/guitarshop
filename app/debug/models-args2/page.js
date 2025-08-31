"use client";
import { gql, useQuery } from "@apollo/client";

const INTROSPECT = gql`
  query {
    __schema {
      queryType { name }
      types {
        kind
        name
        inputFields { name type { kind name ofType { kind name ofType { kind name } } } }
        fields {
          name
          args {
            name
            type { kind name ofType { kind name ofType { kind name } } }
          }
        }
      }
    }
  }
`;

function baseName(t) {
  if (!t) return null;
  if (t.name) return t.name;
  if (t.ofType) return baseName(t.ofType);
  return null;
}

export default function Page() {
  const { data, loading, error } = useQuery(INTROSPECT);
  if (loading) return <main style={{padding:16}}>Loading…</main>;
  if (error) return <main style={{padding:16, color:"crimson"}}>{error.message}</main>;

  const types = data.__schema.types;
  const queryType = types.find(t => t.name === data.__schema.queryType.name);
  const field = queryType?.fields?.find(f => f.name === "findBrandModels");

  if (!field) return <main style={{padding:16, color:"crimson"}}>No findBrandModels in schema.</main>;

  const argRows = field.args.map(arg => {
    const kind = arg.type.kind;
    const name = baseName(arg.type);
    let inputFields = [];
    if (kind === "INPUT_OBJECT" || (name && types.find(t => t.name === name)?.kind === "INPUT_OBJECT")) {
      const inputT = types.find(t => t.name === name);
      inputFields = (inputT?.inputFields || []).map(f => `${f.name}:${baseName(f.type)}`);
    }
    return { arg: arg.name, kind, name, inputFields };
  });

  return (
    <main style={{padding:16}}>
      <h2>findBrandModels – аргументи</h2>
      <ul>
        {argRows.map(r => (
          <li key={r.arg}>
            <b>{r.arg}</b> — {r.kind} {r.name ? `(${r.name})` : ""}
            {r.inputFields.length > 0 && (
              <div style={{marginLeft:12, opacity:0.8}}>
                input fields: {r.inputFields.join(", ")}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
