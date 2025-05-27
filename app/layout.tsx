import "./globals.css"
import React, { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="flex h-screen">
        <Sidebar /> {children}
      </body>
    </html>
  );
}
