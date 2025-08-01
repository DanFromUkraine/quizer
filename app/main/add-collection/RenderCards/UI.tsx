import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import QuestionCard from "./QuestionCard";
import { IndexContextProvider } from "./QuestionCard/CardIndex";
import { RefObject } from "react";
import { Virtualizer } from "@tanstack/react-virtual";

export default function RenderCardsUI({
  cards,
  addEmptyCard,
  allContainerRef,
  rowVirtualizer,
}: {
  cards: QuestionCardType[];
  addEmptyCard: () => void;
  allContainerRef: RefObject<HTMLElement | null>;
  rowVirtualizer: Virtualizer<HTMLElement, Element>;
}) {
  return (
    <section ref={allContainerRef}>
      <div className="flex flex-col gap-2.5">
        {rowVirtualizer.getVirtualItems().map((virtualItem, i) => {
          const cardData = cards[i];
          return (
            <IndexContextProvider value={i} key={virtualItem.key}>
              <QuestionCard {...cardData} />
            </IndexContextProvider>
          );
        })}
      </div>
      <section className="w-full flex justify-center pt-4">
        <button
          type="button"
          className="bg-blueAccent simpleButton"
          onClick={() => addEmptyCard()}
        >
          Додати карточку
        </button>
      </section>
    </section>
  );
}
