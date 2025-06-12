"use client";

import {
  memo,
  Profiler,
  ProfilerOnRenderCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Control,
  FieldValues,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { useSyncIDs } from "./Header/client";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import clsx from "clsx";

export type Data = {
  collectionName: string;
  cardsText: string;
};

type Card = {
  questionTitle: string;
  options: string[];
};

type OptionType = {
  isCorrect: boolean;
  optionText: string;
};

export type QuestionCard = {
  questionTitle: string;
  options: OptionType[];
};

function onRenderCallback(
  id: string,
  phase: unknown,
  actualDuration: unknown,
  baseDuration: unknown,
  startTime: unknown,
  commitTime: unknown
) {
  console.log("Profiler:", {
    id, // ідентифікатор компонента
    phase, // "mount" або "update"
    actualDuration, // час рендеру
    baseDuration, // час без мемоізації
    startTime,
    commitTime,
  });
}

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

function RenderOptions({
  control,
  register,
}: {
  control: Control<QuestionCard, any, QuestionCard>;
  register: UseFormRegister<QuestionCard>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const onAddBtnClick = () => append({ isCorrect: false, optionText: "" });

  return (
    <div className="flex flex-col gap-3">
      {fields.map((data, index) => (
        <Option
          key={index}
          optionData={data}
          index={index}
          register={register}
        />
      ))}
      <button type="button" onClick={onAddBtnClick}>
        Add option
      </button>
    </div>
  );
}

function Option({
  index,
  register,
  optionData: { isCorrect },
}: {
  index: number;
  register: UseFormRegister<QuestionCard>;
  optionData: OptionType;
}) {
  return (
    <div className="flex justify-between bg-fillbg rounded-normal overflow-hidden w-full text-questTextColor font-semibold">
      <label className="w-8 h-full relative rounded-l-normal flex justify-center items-center bg-red-500 has-checked:bg-green-500 hover:bg-red-300 has-checked:hover:bg-green-300 duration-150">
        <input
          type="checkbox"
          {...register(`options.${index}.isCorrect`)}
          className="absolute top-0 left-0 w-full h-full opacity-0 z-20 peer "
        />
        <FaCheck className="hidden peer-checked:flex" />
        <ImCross className="flex peer-checked:hidden " />
      </label>

      <input
        type="text"
        placeholder=""
        {...register(`options.${index}.optionText`)}
        className={clsx(
          "w-full p-3 bg-fillbg duration-150 not-focus:bg-red-300",
          {
            "bg-green-300": isCorrect,
          }
        )}
      />
      <div className="bg-questTextColor h-full min-w-8 flex justify-center items-center hover:bg-red-500 duration-150">
        <span className="w-2/3 h-1.5 bg-white " />
      </div>
    </div>
  );
}

function useQCSS(id: string) {
  // temporary implementation
  const storage = typeof window !== "undefined" ? sessionStorage : null;

  const getQC = () => {
    const rawData = storage?.getItem(id);
    const placeholder = {
      questionTitle: "",
      options: [],
    };
    if (rawData) {
      return JSON.parse(rawData);
    } else {
      storage?.setItem(id, JSON.stringify(placeholder));
      return placeholder;
    }
  };

  const setQC = (newVal: QuestionCard) => {
    storage?.setItem(id, JSON.stringify(newVal));
  };

  const deleteQC = () => {
    storage?.removeItem(id);
  };

  return {
    lastData: getQC(),
    setQC,
    deleteQC,
  };
}

function QuestionCard({ id, index }: { id: string; index: number }) {
  const { deleteQC, lastData, setQC } = useQCSS(id);

  console.log({ lastData });

  const {
    register,
    control,
    watch,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: lastData,
  });

  console.log("render");

  const data = watch();

  const debounce = useMemo(createDebounce, []);

  useEffect(() => {
    if (isDirty) {
      // console.log(data);
      debounce(() => {
        setQC(data);
        console.log("data write");
      }, 1000);
    }
  }, [data]);

  return (
    <form className="flex flex-col gap-3 w-full border border-lightGray p-6 rounded-normal">
      <div className="flex justify-between items-center">
        <p className="px-3 py-1.5 text-darker w-fit font-semibold bg-fillbg rounded-normal">
          Картка №{index}
        </p>
        <FaRegTrashAlt className="text-xl text-questTextColor" />
      </div>
      <input
        placeholder="Введіть якусь інфу"
        {...register("questionTitle")}
        className="text-questTextColor font-semibold focus:outline-none"
      />
      <RenderOptions control={control} register={register} />
    </form>
  );
}

export default function page() {
  const { IDs, addID, deleteID } = useSyncIDs();

  console.log("render page");

  return (
    <main className="w-full p-8 flex flex-col">
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

export function createDebounce() {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (callback: () => void, wait: number) => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
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
