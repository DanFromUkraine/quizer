"use client";

import UnfilteredCard from "@/app/components/Card";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { MdOutlineAddBox } from "react-icons/md";
import { collectionDataAtom } from "../atoms";

// export default function Page() {
//   const [cards, setCards] = useState<CardData[]>([]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const stored = localStorage.getItem("unfilteredCards");
//         if (stored) {
//           setCards(JSON.parse(stored) as CardData[]);
//         }
//       } catch (error) {
//         console.error("Не вдалося прочитати unfilteredCards:", error);
//       }
//     }
//   }, []);

//   return (
//     <div className="flex flex-col space-y-4">
//       {cards.map(({ questionText, options }) => (
//         <UnfilteredCard
//           key={questionText}
//           questionText={questionText}
//           options={options}
//         />
//       ))}
//     </div>
//   );
// }

type Collection = {
  collectionName: string;
  cards: Card[];
};

type Card = {
  questionText: string;
  options: Option[];
};

type Option = {
  isCorrect: boolean;
  optionText: string;
};

export default function page() {
  const defaultValue = useAtomValue(collectionDataAtom);

  console.log({defaultValue})

  const methods = useForm({
    defaultValues: defaultValue,
  });

  const onSubmit: SubmitHandler<Collection> = (data) => {
    console.log("submitted data:", data);
  };

  return (
    <main className="w-full p-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header />
          <Cards />
          <div className="mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Зберегти колекцію
            </button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}

function Header() {
  const { register } = useFormContext();

  return (
    <header className="flex justify-between items-center py-4">
      <input
        {...register("collectionName")}
        placeholder="Назва колекції"
        className="border-b-2 border-gray-300 focus:border-blue-500 outline-none text-xl font-semibold flex-grow mr-4"
      />
    </header>
  );
}

function Cards() {
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({ control, name: "cards" });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} index={index} />
      ))}
      <button
        type="button"
        onClick={() => append({ textQuestion: "", options: [] })}
        className="flex items-center text-blue-600"
      >
        <MdOutlineAddBox className="mr-1" /> Додати картку
      </button>
    </div>
  );
}

function QuestionCard({ index }: { index: number }) {
  const { register, control } = useFormContext();
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({ control, name: `cards.${index}.options` });

  return (
    <section className="border rounded-lg p-4">
      <div className="mb-4">
        <input
          {...register(`cards.${index}.textQuestion`)}
          placeholder={`Питання #${index + 1}`}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="space-y-2">
        {optionFields.map((opt, optIndex) => (
          <div key={opt.id} className="flex items-center">
            <input
              {...register(`cards.${index}.options.${optIndex}.text`)}
              placeholder={`Варіант ${optIndex + 1}`}
              className="flex-grow border p-2 rounded mr-2"
            />
            <button
              type="button"
              onClick={() => removeOption(optIndex)}
              className="text-red-500"
            >
              Видалити
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendOption({ text: "" })}
          className="text-blue-600"
        >
          Додати варіант
        </button>
      </div>
    </section>
  );
}
