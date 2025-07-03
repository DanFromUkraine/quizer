import {
  useAddEmptyCard,
  useGetAndInitAllCards,
} from "@/app/lib/db/AddCollectionPageDB";
import RenderCardsUI from "./UI";
import { useAddCardOnShortcut } from "./QuestionCard/client";

export default function RenderCards() {
  const { addEmptyCard } = useAddEmptyCard();
  useAddCardOnShortcut();

  const cards = useGetAndInitAllCards();

  return <RenderCardsUI {...{ cards, addEmptyCard }} />;
}
