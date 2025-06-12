"use client";

import { useEffect, useState } from "react";
import { useSyncIDs } from "./client";
import QuestionCard from "./QuestionCard";
import PageUI from "./UI";

export type Data = {
  collectionName: string;
  cardsText: string;
};

export default function page() {
  const [IDs, addID] = useSyncIDs();
  const [safeIDs, setSafeIDs] = useState<string[]>([]);

  useEffect(() => {
    setSafeIDs(IDs);
  }, [IDs]);

  console.log("render page", IDs);

  return <PageUI IDs={safeIDs} addID={addID} />;
}

// export function debounce<T extends unknown[], U>(
//   callback: (...args: T) => PromiseLike<U> | U,
//   wait: number
// ) {
//   let timer: ReturnType<typeof setTimeout>;

//   return (...args: T): Promise<U> => {
//     clearTimeout(timer);
//     return new Promise((resolve) => {
//       timer = setTimeout(() => resolve(callback(...args)), wait);
//     });
//   };
// }

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
