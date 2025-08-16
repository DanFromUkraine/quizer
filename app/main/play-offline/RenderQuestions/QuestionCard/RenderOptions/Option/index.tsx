"use client";

import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import { useTickOption } from "@/app/lib/db/History";
import clsx from "clsx";
import { useState } from "react";

function useOptionClicked(isCorrect: boolean) {
  const { tickOption } = useTickOption();
}

export default function Option({
  isCorrect,
  optionText,
  index
}: Pick<QuestionCardType, "options">["options"][number] & { index: number }) {
  const [correct, setCorrect] = useState<string>();

  const onClick = () => {
    setCorrect(isCorrect ? "correct" : "incorrect");
  };

  return (
    <div
      className={clsx(
        "w-full h-full min-h-[60px] p-4 border-2 rounded-normal border-lightGray"
      )}
      onClick={onClick}
      style={{
        backgroundColor: correct
          ? correct === "correct"
            ? "green"
            : "red"
          : "",
      }}
    >
      {optionText}
    </div>
  );
}
