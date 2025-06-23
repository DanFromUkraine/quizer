import { useGetAndAddCards } from "@/app/lib/db/addCollectionPageDB";
import QuestionCard from "./QuestionCard";

export default function RenderCards() {
  const { cards, addEmptyCard } = useGetAndAddCards();

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
