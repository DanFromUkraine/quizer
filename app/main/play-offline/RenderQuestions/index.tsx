"use client";

import { useInitFromHistory } from "@/app/lib/db/History";
import QuestionCard from "./QuestionCard";
import { useCollectionContext } from "../Provider";

export default function RenderQuestions() {
  useInitFromHistory();
  const collection = useCollectionContext();

  console.log({ collection });

  return (
    <div className="flex flex-col w-full items-center gap-2.5">
      {collection?.attemp.cards.map((card, i) => (
        <QuestionCard key={i} {...card} index={i} />
      ))}
    </div>
  );
}
