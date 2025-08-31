"use client";
import { useMemo, useState } from "react";

const FALLBACK = "/placeholder.png";

export default function SafeImg({ src, alt = "", style, proxy = true, ...rest }) {
  const [broken, setBroken] = useState(false);

  const finalSrc = useMemo(() => {
    if (!src) return FALLBACK;
    let s = String(src).trim();
    if (!s) return FALLBACK;
    if (s.startsWith("//")) s = "https:" + s;
    if (s.startsWith("http://")) s = "https://" + s.slice(7);
    try {
      const u = new URL(s);
      return proxy ? `/api/img?u=${encodeURIComponent(u.toString())}` : u.toString();
    } catch {
      return s;
    }
  }, [src, proxy]);

  return (
    <img
      src={broken ? FALLBACK : finalSrc}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
      style={{ display:"block", width:"100%", height:120, objectFit:"contain", background:"#fff", borderRadius:8, ...style }}
      {...rest}
    />
  );
}
