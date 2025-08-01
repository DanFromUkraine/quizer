"use client";

import {
  useAddEmptyCard,
  useClearJotaiOnExit,
  useInitAllCards,
} from "@/app/lib/db/AddCollectionPageDB";
import { useVirtualizer } from "@tanstack/react-virtual";
import RenderCardsUI from "./UI";
import { useAddCardOnShortcut } from "./client";
import { useAtomValue } from "jotai";
import { cardsAtom } from "@/app/lib/jotai/addCollection";
import { useRef } from "react";

export default function RenderCards() {
  useAddCardOnShortcut();
  useInitAllCards();
  useClearJotaiOnExit();

  const { addEmptyCard } = useAddEmptyCard();
  const cards = useAtomValue(cardsAtom);

  const allContainerRef = useRef<HTMLElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: cards.length,
    getScrollElement: () => allContainerRef.current,
    estimateSize: () => 500,
  });

  return (
    <RenderCardsUI
      {...{ cards, addEmptyCard, rowVirtualizer, allContainerRef }}
    />
  );
}
