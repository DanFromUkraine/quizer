"use client";

import dynamic from "next/dynamic";

export type Data = {
  collectionName: string;
  cardsText: string;
};

export default function handleLoading() {
  const Page = dynamic(() => import("./client"), { ssr: false });

  return <Page />;
}
