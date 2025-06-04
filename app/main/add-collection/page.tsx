"use client";

import {
  memo,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { useSyncIDs, useSyncQuestionCard } from "./Header/client";
import {
  Control,
  FieldValues,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { register } from "module";

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

export type QuestionCard = {
  questionTitle: string;
  options: {
    isCorrect: boolean;
    optionText: string;
  }[];
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

const QuestionCard = memo(function QuestionCard({ id }: { id: string }) {
  const { questionCard, deleteQuestionCard, setQuestionCardNewValue } =
    useSyncQuestionCard(id);

  useEffect(() => () => deleteQuestionCard(), []);

  const { register, control, watch } = useForm({
    defaultValues: questionCard,
  });

  return (
    <form className="flex flex-col">
      <input placeholder="Введіть якусь інфу" {...register("questionTitle")} />
      <RenderOptions control={control} register={register} />
    </form>
  );
});

export default function page() {
  const { IDs, addID } = useSyncIDs();

  return (
    <main className="w-full p-8 flex flex-col">
      <div className="flex justify-center gap-2">
        <h1>Create a collection with cards</h1>
        <p></p>
      </div>
      <section>
        {IDs?.map((id) => (
          <QuestionCard key={id} id={id} />
        ))}
      </section>

      <button onClick={() => addID()}>Додати карточку</button>
    </main>
  );
}

function RenderOptions({
  control,
  register,
}: {
  control: Control<QuestionCard, any, QuestionCard>;
  register: UseFormRegister<QuestionCard>;
}) {
  const { fields, append } = useFieldArray({ control, name: "options" });
  const onAddBtnClick = () => append({ isCorrect: false, optionText: "" });

  return (
    <div className="flex flex-col">
      {fields.map((_, index) => (
        <div key={index} className="flex ">
          <input
            type="text"
            placeholder=""
            {...register(`options.${index}.optionText`)}
          />
          <input type="checkbox" {...register(`options.${index}.isCorrect`)} />
        </div>
      ))}
      <button onClick={onAddBtnClick}>Add option</button>
    </div>
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
