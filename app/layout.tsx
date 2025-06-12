import { Provider } from "jotai";
import { ReactNode } from "react";
import "./globals.css";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
