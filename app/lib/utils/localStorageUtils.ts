"use client";

function setLS<T>(name: string, value: T) {
  const stringified = JSON.stringify(value);
  localStorage.setItem(name, stringified);
}

function getLS(name: string) {
  const raw = localStorage.getItem(name);

  return raw
    ? JSON.parse(raw)
    : new Error(`did not find ${name} in localStorage`);
}

export function getSetInitLS<T>({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: T;
}) {
  const prevData = getLS(name) as T | null;

  if (!prevData) {
    setLS(name, defaultValue);
  }

  return {
    prevData: prevData || defaultValue,
    setNew(newValue: T) {
      setLS(name, newValue);
    },
  };
}
