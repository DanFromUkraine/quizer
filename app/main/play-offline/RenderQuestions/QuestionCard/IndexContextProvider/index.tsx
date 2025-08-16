import { createContext, ReactNode } from "react";

export const IndexContext = createContext<number | null>(null);

export default function IndexContextProvider({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <IndexContext.Provider value={index}>{children}</IndexContext.Provider>
  );
}
