"use client";

import { useSetAtom } from "jotai";
import { redirect } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { collectionDataAtom } from "./atoms";
import CardsInput from "./CardsInput";
import Header from "./Header";

export type Data = {
  collectionName: string;
  cardsText: string;
};

export default function page() {
  const methods = useForm({
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

      const optionsDivided = optionsText
        .replace(/\n/g, "")
        .split(/\b[A-Z]\./g)
        .map((str) => str.trim())
        .filter((str) => str.length !== 0);

      return {
        questionText,
        options: optionsDivided,
      };
    });

    console.log({ result });

    setCollectionCreationData({ collectionName, cards: result });
    redirect("/add-collection/choose-correct");
  };

  return (
    <main className="w-full p-6">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col "
        >
          <Header />
          <CardsInput />
          <button type="submit">Зберегти</button>
        </form>
      </FormProvider>
    </main>
  );
}
