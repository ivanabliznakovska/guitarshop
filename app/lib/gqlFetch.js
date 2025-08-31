export async function gqlFetch(query, variables) {
    const res = await fetch("https://graphql-api-brown.vercel.app/api/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.errors?.[0]?.message || "Network error");
    if (json.errors?.length) throw new Error(json.errors[0].message);
    return json.data;
  }
  