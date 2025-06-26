import { useAddEmtyCard } from "@/app/lib/db/AddCollectionPageDB";
import QuestionCard from "./QuestionCard";
import { useAtomValue } from "jotai";
import { cardsAtom } from "@/app/lib/jotai/addCollection";

export default function RenderCards() {
  const { addEmptyCard } = useAddEmtyCard();
  const cards = useAtomValue(cardsAtom);

  return (
    <section>
      <div className="flex flex-col gap-2.5">
        {cards.map((cardData, ind) => (
          <QuestionCard key={cardData.id} {...cardData} index={ind} />
        ))}
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
