"use client";

import { useContext } from "react";
import { collectionContext } from "../provider";
import QuestionCard from "./QuestionCard";

export default function RenderQuestions() {
  const collection = useContext(collectionContext);

  return (
    <div className="flex flex-col w-full items-center gap-2.5">
      {collection?.cards.map((card, i) => (
        <QuestionCard key={card.id} {...card} index={i} />
      ))}
    </div>
  );
}
