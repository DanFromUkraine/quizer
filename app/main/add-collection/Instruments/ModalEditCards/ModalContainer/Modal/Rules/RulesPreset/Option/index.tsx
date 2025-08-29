"use client";

import { getSetInitLS } from "@/app/lib/db/simpleUtils/simpleLocasStorage";
import { ReactNode, useCallback } from "react";
import OptionUI from "./UI";

export default function Option({
  className,
  name,
  children,
}: {
  className?: string;
  name: string;
  children: ReactNode;
}) {
  const { prevData, setNew } = getSetInitLS<boolean>({
    name,
    defaultValue: false,
  });

  const onChange = useCallback(() => {
    setNew(!prevData);
  }, []);

  return (
    <OptionUI
      {...{
        className,
        name,
        children,
        onChange,
        defaultChecked: prevData,
      }}
    />
  );
}
