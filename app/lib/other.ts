"use client";

export function getOrInitSS<T>(key: string, initVal: T): T {
  const storage = typeof window !== "undefined" ? sessionStorage : null;
  const rawData = storage?.getItem(key);

  if (rawData) {
    return JSON.parse(rawData);
  }

  setSS(key, initVal);
  return initVal;
}

export function setSS<T>(key: string, newVal: T) {
  const storage = typeof window !== "undefined" ? sessionStorage : null;
  storage?.setItem(key, JSON.stringify(newVal));
}
