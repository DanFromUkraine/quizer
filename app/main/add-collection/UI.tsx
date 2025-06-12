import QuestionCard from "./QuestionCard";

export default function PageUI({
  IDs,
  addID,
}: {
  IDs: string[] | null;
  addID: () => void;
}) {
  return (
    <main className="w-full p-8 flex flex-col min-h-full">
      <input
        type="text"
        placeholder="Введіть заголовок"
        className="px-6 py-1.5 text-[#5C5E64] text-2xl font-semibold focus:outline-none mb-8"
      />
      <section className="flex flex-col gap-2.5">
        {IDs?.map((id, ind) => (
          <QuestionCard key={id} id={id} index={ind + 1} />
        ))}
      </section>

      <section className="w-full flex justify-center pt-4">
        <button
          type="button"
          className="bg-blueAccent rounded-normal w-min py-2 px-3 whitespace-nowrap text-white font-semibold "
          onClick={() => addID()}
        >
          Додати карточку
        </button>
      </section>
    </main>
  );
}
