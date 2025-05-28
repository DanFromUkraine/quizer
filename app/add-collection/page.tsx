"use client";

import clsx from "clsx";
import { FormEventHandler } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";


type Data = {
  collectionName: string;
  cardsText: string;
};

export default function page() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      collectionName: "",
      cardsText: "",
    },
  });
  const onSubmit: SubmitHandler<Data> = (data) => {
    const cardsDivided = data.cardsText.split(/\d+\./g).slice(1);

    const result = cardsDivided.map((card) => {
      const [questionText, optionsText] = card.split(/[:?]/);

      const options = optionsText
        .replace(/\n/g, "")
        .split(/\b[A-Z]\./g)
        .map((str) => str.trim())
        .filter((str) => str.length !== 0);

      return {
        questionText,
        options,
      };
    });

    console.log({ result });
  };

  return (
    <main className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
        <Header register={register} />
        <CardsInput register={register} />
        <button type="submit">Зберегти</button>
      </form>
    </main>
  );
}

function Header({ register }: { register: UseFormRegister<Data> }) {
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

function CardsInput({ register }: { register: UseFormRegister<Data> }) {
  const onInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = e.nativeEvent.target as HTMLTextAreaElement;

    if (textarea && "style" in textarea) {
      textarea.style.height = "48px";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  return (
    <textarea
      placeholder="Введіть текст"
      className={clsx(
        "resize-none overflow-hidden w-full rounded-lg bg-transparent  outline-1 outline-alternateBorder px-6 box-border leading-5 py-3 focus:outline-white focus:outline-2 text-sm text-defaultText h-12"
      )}
      onInput={onInput}
      {...register("cardsText")}
    />
  );
}



// import React from "react";
// import { useForm, FormProvider, useFieldArray, useFormContext, useController } from "react-hook-form";
// import { MdOutlineAddBox } from "react-icons/md";
// import clsx from "clsx";

// Якщо використовуєш Next.js 13+ у app/директорії, файл може бути app/page.tsx
// Якщо класичний Next.js або CRA — це може бути src/components/NestedFormExample.jsx

// Типізація (необовʼязково, якщо без TypeScript)
// interface Option {
//   text: string;
// }
// interface CardData {
//   textQuestion: string;
//   options: Option[];
// }
// interface FormValues {
//   collectionName: string;
//   cards: CardData[];
// }

// export default function NestedFormExample() {
//   // ініціалізуємо defaultValues для всіх масивів і полів
//   const methods = useForm({
//     defaultValues: {
//       collectionName: "",
//       cards: [],
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("submitted data:", data);
//   };

//   return (
//     <main className="w-full p-4">
//       <FormProvider {...methods}>
//         <form onSubmit={methods.handleSubmit(onSubmit)}>
//           <Header />
//           <Cards />
//           <div className="mt-6">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Зберегти колекцію
//             </button>
//           </div>
//         </form>
//       </FormProvider>
//     </main>
//   );
// }

// function Cards() {
//   const { control } = useFormContext();
//   const { fields, append } = useFieldArray({ control, name: "cards" });

//   return (
//     <div className="space-y-6">
//       {fields.map((field, index) => (
//         <Card key={field.id} index={index} />
//       ))}
//       <button
//         type="button"
//         onClick={() => append({ textQuestion: "", options: [] })}
//         className="flex items-center text-blue-600"
//       >
//         <MdOutlineAddBox className="mr-1" /> Додати картку
//       </button>
//     </div>
//   );
// }

// function Card({ index }) {
//   const { register, control } = useFormContext();
//   const {
//     fields: optionFields,
//     append: appendOption,
//     remove: removeOption,
//   } = useFieldArray({ control, name: `cards.${index}.options` });

//   return (
//     <section className="border rounded-lg p-4">
//       <div className="mb-4">
//         <input
//           {...register(`cards.${index}.textQuestion`)}
//           placeholder={`Питання #${index + 1}`}
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       <div className="space-y-2">
//         {optionFields.map((opt, optIndex) => (
//           <div key={opt.id} className="flex items-center">
//             <input
//               {...register(`cards.${index}.options.${optIndex}.text`)}
//               placeholder={`Варіант ${optIndex + 1}`}
//               className="flex-grow border p-2 rounded mr-2"
//             />
//             <button
//               type="button"
//               onClick={() => removeOption(optIndex)}
//               className="text-red-500"
//             >
//               Видалити
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => appendOption({ text: "" })}
//           className="text-blue-600"
//         >
//           Додати варіант
//         </button>
//       </div>
//     </section>
//   );
// }