import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import QuestionCard from "./QuestionCard";
import { IndexContextProvider } from "./QuestionCard/CardIndex";

export default function RenderCardsUI({
  cards,
  addEmptyCard,
}: {
  cards: QuestionCardType[];
  addEmptyCard: () => void;
}) {
  return (
    <section>
      <div className="flex flex-col gap-2.5">
        {cards?.map((cardData, ind) => (
          <IndexContextProvider value={ind} key={cardData.id}>
            <QuestionCard {...cardData} />
          </IndexContextProvider>
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
