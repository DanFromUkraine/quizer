"use client";

import { Card, cardsAtom } from "@/app/lib/jotai/collections";
import { useAtom } from "jotai";

export type Data = {
  collectionName: string;
  cardsText: string;
};

export default function page() {
  const [cards, setCards] = useAtom(cardsAtom);

  const addCard = () => {
    setCards([
      ...cards,
      {
        questionTitle: "",
        options: [],
        id: crypto.randomUUID(),
      },
    ]);
  };

  const changeCard = debounce((newVal: Card) => {
    const newCards = cards.map((card) =>
      card.id === newVal.id ? newVal : card
    );
    setCards(newCards);
  }, 500);

  console.log("render");

  return (
    <main className="w-full p-8 flex flex-col">
      <div className="flex justify-center gap-2">
        <h1>Create a collection with cards</h1>
        <p></p>
      </div>
      <ul>
        {cards.map(({ questionTitle, id }) => (
          <MyCard
            key={id}
            questionTitle={questionTitle}
            id={id}
            changeCard={changeCard}
          />
        ))}
      </ul>

      <button onClick={() => addCard()}>Додати карточку</button>
    </main>
  );
}

function MyCard({
  questionTitle,
  id,
  changeCard,
}: {
  questionTitle: string;
  id: string;
  changeCard: (newVal: Card) => void;
}) {
  return (
    <input
      placeholder="Введіть якусь інфу"
      onInput={(event) =>
        changeCard({
          questionTitle: event.currentTarget.value,
          options: [],
          id,
        })
      }
      defaultValue={questionTitle}
    />
  );
}

export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
}

// const methods = useForm({
//   defaultValues: {
//     collectionName: "",
//     cardsText: "",
//   },
// });

// const setCollectionCreationData = useSetAtom(createCollectionAtomData);

// const onSubmit: SubmitHandler<Data> = ({ collectionName, cardsText }) => {
//   const cardsDivided = cardsText.split(/\d+\./g).slice(1);

//   const result = cardsDivided.map((card) => {
//     const [questionTitle, optionsText] = card.split(/[:?]/);

//     const optionsDivided = optionsText
//       .replace(/\n/g, "")
//       .split(/\b[A-Z]\./g)
//       .map((str) => str.trim())
//       .filter((str) => str.length !== 0);

//     return {
//       questionTitle,
//       options: optionsDivided,
//     };
//   });

//   setCollectionCreationData({ title: collectionName, cards: result });
// };

/* <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col "
        >
          <Header />
          <CardsInput />
          <button type="submit">Зберегти</button>
        </form>
      </FormProvider> */
