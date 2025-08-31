"use client";

import { Context, useContext } from "react";

export default function getContextEnhancedReceiver<Data>({
  Context,
  contextName,
}: {
  Context: Context<Data>;
  contextName: string;
}) {
  return () => {
    const data = useContext(Context);

    if (data === null) {
      console.warn(
        `Could not retrieve info from ${contextName}. Probably the hook to get context info is not under ${contextName} provider. Double-check it`
      );
    }

    return data;
  };
}
