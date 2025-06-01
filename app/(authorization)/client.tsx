"use client";

import { useSetAtom } from "jotai";
import Link from "next/link";
import { authModeAtom } from "../lib/jotai/auth";

export function SkipBtn() {
  const setMode = useSetAtom(authModeAtom);

  const onClick = () => {
    setMode("guest");
  };

  return (
    <Link href="/main" onClick={onClick} className="text-secondary">
      Skip for now
    </Link>
  );
}
