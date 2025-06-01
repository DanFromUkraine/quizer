import { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar /> {children}
    </div>
  );
}

