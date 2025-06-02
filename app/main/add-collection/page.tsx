"use client";

import { Reducer, ReducerState, useEffect, useReducer, useState } from "react";

export type Data = {
  collectionName: string;
  cardsText: string;
};

type Card = {
  questionTitle: string;
  options: string[];
};

type Option = {
  isCorrect: boolean;
  optionText: string;
};

function getOrInit(key: string, initData: unknown) {
  const storage = typeof window !== "undefined" ? sessionStorage : null;

  const rawData = storage?.getItem(key);
  if (rawData) {
    return JSON.parse(rawData);
  } else {
    storage?.setItem(key, JSON.stringify(initData));
    return initData;
  }
}

function getOrInitCardByID(id: string): Card {
  return getOrInit(id, {
    questionTitle: "",
    options: [],
  });
}

function updateCardByID(id: string, newVal: Card) {
  const storage = typeof window !== "undefined" ? sessionStorage : null;

  storage?.setItem(id, JSON.stringify(newVal));
}

enum ID_REDUCER_TYPES {
  GET = "GET",
  ADD = "ADD",
  REMOVE = "REMOVE",
  CLEAR_ALL = "CLEAR_ALL",
}

function useCardIDReducer() {
  function reducer(
    state: string[],
    { type, payload }: { type: string; payload: string }
  ) {
    const newIDs = [...state];

    if (type === ID_REDUCER_TYPES.ADD) {
      const newID = crypto.randomUUID();
      newIDs.push(newID);
      sessionStorage.setItem("cardIDs", JSON.stringify(newIDs));
    } else if (type === ID_REDUCER_TYPES.REMOVE) {
      newIDs.filter((id) => id !== payload);
      sessionStorage.removeItem(payload);
    } else if (type === ID_REDUCER_TYPES.CLEAR_ALL) {
      sessionStorage.clear();
    }
    return newIDs;
  }

  const [state, dispatch] = useReducer(
    reducer,
    getOrInit("cardIDs", []) as string[]
  );
  return [state, dispatch] as const;
}

export default function page() {
  const [cardIDs, dispatch] = useCardIDReducer();

  return (
    <main className="w-full p-8 flex flex-col">
      <div className="flex justify-center gap-2">
        <h1>Create a collection with cards</h1>
        <p></p>
      </div>
      <section>
        {cardIDs.map((id) => (
          <MyCard key={id} id={id} />
        ))}
      </section>

      <button onClick={() => dispatch({ type: "ADD", payload: "" })}>
        Додати карточку
      </button>
    </main>
  );
}

function MyCard({ id }: { id: string }) {
  const [questionTitle, setQuestionTitle] = useState("");

  useEffect(() => {
    setQuestionTitle(getOrInitCardByID(id).questionTitle);
  }, []);

  const [options, setOptions] = useState<Option[]>([]);

  const addOption = () => {
    setOptions((prev) => [...prev, { optionText: "", isCorrect: false }]);
  };

  const removeOption = (index: number) => {
    setOptions((prev) => prev.splice(index, 1));
  };

  const onChange = (data: unknown) => {
    console.log({ data });
  };

  return (
    <form className="flex flex-col" onChange={onChange}>
      <input placeholder="Введіть якусь інфу" defaultValue={questionTitle} />
      <div className="flex flex-col">
        {options.map(({}, id) => (
          <div key={id} className="flex ">
            <input type="text" />
            <input type="checkbox" />
          </div>
        ))}
      </div>
    </form>
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
