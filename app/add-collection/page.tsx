"use client";

import clsx from "clsx";
import { useSetAtom } from "jotai";
import { redirect } from "next/navigation";
import { FormEventHandler } from "react";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { collectionDataAtom } from "./atoms";

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

  const setCollectionCreationData = useSetAtom(collectionDataAtom);

  const onSubmit: SubmitHandler<Data> = ({ collectionName, cardsText }) => {
    const cardsDivided = cardsText.split(/\d+\./g).slice(1);

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

    setCollectionCreationData({ collectionName, cards: result });
    redirect("/add-collection/choose-correct");
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
