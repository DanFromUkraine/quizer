import { ReactNode } from "react";
import { Provider } from "jotai";

export default function layout({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}
