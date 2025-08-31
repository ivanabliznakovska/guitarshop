import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const u = searchParams.get("u");
    if (!u) return NextResponse.json({ error: "Missing ?u=" }, { status: 400 });

    let url = String(u).trim();
    if (url.startsWith("//")) url = "https:" + url;
    if (url.startsWith("http://")) url = "https://" + url.slice(7);
    try { new URL(url); } catch { return NextResponse.json({ error: "Invalid URL" }, { status: 400 }); }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
        Referer: "",
      },
      cache: "no-store",
    });
    if (!res.ok) return NextResponse.json({ error: `Upstream ${res.status}` }, { status: 502 });

    const ct = res.headers.get("content-type") || "image/jpeg";
    const buf = await res.arrayBuffer();
    return new NextResponse(buf, { status: 200, headers: { "content-type": ct, "cache-control": "public, max-age=86400, immutable" } });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Proxy error" }, { status: 500 });
  }
}
