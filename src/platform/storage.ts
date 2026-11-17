/**
 * Key-value persistence: IndexedDB first (structured, survives better on iOS
 * home-screen apps), localStorage as mirror/fallback, memory as last resort
 * (private mode). Capacitor builds can swap in @capacitor/preferences here.
 */
const DB = "babymo-time";
const STORE = "kv";

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((res) => {
    try {
      if (!("indexedDB" in window)) return res(null);
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE);
      r.onsuccess = () => res(r.result);
      r.onerror = () => res(null);
      r.onblocked = () => res(null);
      setTimeout(() => res(null), 1500);
    } catch {
      res(null);
    }
  });
}
let dbp: Promise<IDBDatabase | null> | null = null;
const db = () => (dbp ??= openDb());
const mem = new Map<string, string>();

function lsGet(k: string): string | null {
  try {
    return localStorage.getItem(k);
  } catch {
    return mem.get(k) ?? null;
  }
}
function lsSet(k: string, v: string) {
  try {
    localStorage.setItem(k, v);
  } catch {
    mem.set(k, v);
  }
}

export async function load<T>(key: string): Promise<T | null> {
  const d = await db();
  if (d) {
    try {
      const v = await new Promise<unknown>((res, rej) => {
        const tx = d.transaction(STORE, "readonly").objectStore(STORE).get(key);
        tx.onsuccess = () => res(tx.result);
        tx.onerror = () => rej(tx.error);
      });
      if (v != null) return v as T;
    } catch {
      /* fall through */
    }
  }
  const s = lsGet("bmt_" + key);
  if (s) {
    try {
      return JSON.parse(s) as T;
    } catch {
      return null;
    }
  }
  return null;
}

export async function save<T>(key: string, value: T): Promise<void> {
  // localStorage mirror first: synchronous, so a closing tab still keeps it
  try {
    lsSet("bmt_" + key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
  const d = await db();
  if (!d) return;
  try {
    await new Promise<void>((res, rej) => {
      const tx = d.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(value, key);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  } catch {
    /* mirror already written */
  }
}

export async function remove(key: string): Promise<void> {
  try {
    localStorage.removeItem("bmt_" + key);
  } catch {
    mem.delete(key);
  }
  const d = await db();
  if (!d) return;
  try {
    d.transaction(STORE, "readwrite").objectStore(STORE).delete(key);
  } catch {
    /* ignore */
  }
}

/** Ask the browser not to evict our data (best effort). */
export function persist(): void {
  try {
    navigator.storage?.persist?.();
  } catch {
    /* ignore */
  }
}

/* Shared hub preferences (same origin as play.babymo.id): language, theme, child name. */
export const hub = {
  lang(): "en" | "id" | null {
    const v = lsGet("bm_lang");
    return v === "en" || v === "id" ? v : null;
  },
  setLang(l: "en" | "id") {
    lsSet("bm_lang", l);
  },
  childName(): string {
    return (lsGet("mo_child_name") || "").trim().slice(0, 24);
  },
  /** add stars to the hub's shared star jar too, so they count everywhere */
  addHubStars(n: number) {
    const cur = parseInt(lsGet("bm_star_jar") || "0", 10) || 0;
    lsSet("bm_star_jar", String(cur + n));
  },
};
