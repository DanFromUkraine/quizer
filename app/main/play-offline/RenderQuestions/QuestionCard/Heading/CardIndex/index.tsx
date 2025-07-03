"use client";

import { collectionContext } from "@/app/main/play-offline/provider";
import { useContext } from "react";

export default function CardIndex({ index }: { index: number }) {
  const { cards } = useContext(collectionContext) || { cards: [] };

  return (
    <div className="text-sm">
      {index + 1}/{cards.length}
    </div>
  );
}
