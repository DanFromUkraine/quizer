import { statusBarColorAtom } from "@/app/lib/jotai/userState";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

export function ColorStatusBar() {
  const color = useAtomValue(statusBarColorAtom);
  const prevColor = useRef("");

  useEffect(() => {
    // requestAnimationFrame(() => {});
  }, []);

  return (
    <section className="border-b border-b-lightGray w-full h-32  relative">
      <div className="statusBarLayer statusBarBlueGradient" />
      <div
        className={clsx(
          " absolute bg-[#ffd93b] top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300",
          { "opacity-100 z-10": color === "yellow" }
        )}
      />
    </section>
  );
}
