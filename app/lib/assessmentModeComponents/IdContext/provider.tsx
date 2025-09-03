"use client";

import { ReactNode } from "react";
import { IdContext } from "./context";

export default function IdContextProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return <IdContext.Provider value={id}>{children} </IdContext.Provider>;
}
