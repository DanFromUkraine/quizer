"use client";

import {
  useAddEmptyCard,
  useClearJotaiOnExit,
  useInitAllCards,
} from "@/app/lib/db/AddCollectionPageDB";
import RenderCardsUI from "./UI";
import { useAddCardOnShortcut } from "./client";
import { useAtomValue } from "jotai";
import { cardsAtom } from "@/app/lib/jotai/addCollection";

export default function RenderCards() {
  useAddCardOnShortcut();
  useInitAllCards();
  useClearJotaiOnExit();

  const { addEmptyCard } = useAddEmptyCard();
  const cards = useAtomValue(cardsAtom);

  return <RenderCardsUI {...{ cards, addEmptyCard }} />;
}
