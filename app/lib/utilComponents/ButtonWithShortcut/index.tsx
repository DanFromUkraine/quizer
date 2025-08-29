"use client";

import clsx from "clsx";
import RenderShorcutKeys from "./RenderShortcutKeys";
import { useEffect, useRef, useState } from "react";

export default function BtnWithShortcut({
  textContent,
  shortcutKeys,
  className,
  onClick,
}: {
  textContent: string;
  shortcutKeys: string[];
  className?: string;
  onClick?: () => void;
  type: string;
}) {
  const containerRef = (ref: unknown) => {
    console.log(ref);
  };

  console.log("renderBtnWithShortcut");

  return (
    <button
      className={clsx(
        "simpleButton flex justify-between group px-6 bg-blueAccent gap-2 items-center overflow-hidden w-fit",
        className
      )}
      onClick={onClick}
      ref={containerRef}
    >
      <p className="">{textContent}</p>
      <div className="flex w-auto opacity-0 transition-[width_1s_ease-in-out,_left_1.5s_ease-in-out] items-center gap-2 group-hover:opacity-100">
        <RenderShorcutKeys shortcutKeys={shortcutKeys} />
      </div>
    </button>
  );
}
