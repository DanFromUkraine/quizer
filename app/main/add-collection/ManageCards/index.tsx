"use client";

import {
  CardMethodsType,
  QuestionCardType,
  useQuestionCards,
} from "@/app/lib/DBs/add-collection-DB";
import QuestionCard from "./QuestionCard";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export type useManageCardsType = () => {
  cards: QuestionCardType[];
  addEmptyCard: () => void;
  cardMethods: CardMethodsType;
};

export default function ManageCards() {

  

  const { cards, cardMethods, addEmptyCard } = useQuestionCards();

  return (
    <div>
      <section className="flex flex-col gap-2.5">
        {cards?.map((card, ind) => (
          <QuestionCard
            key={ind}
            {...card}
            cardMethods={cardMethods}
            index={ind}
          />
        ))}
      </section>

      <section className="w-full flex justify-center pt-4">
        <button
          type="button"
          className="bg-blueAccent rounded-normal w-min py-2 px-3 whitespace-nowrap text-white font-semibold "
          onClick={() => addEmptyCard()}
        >
          Додати карточку
        </button>
      </section>
    </div>
  );
}
