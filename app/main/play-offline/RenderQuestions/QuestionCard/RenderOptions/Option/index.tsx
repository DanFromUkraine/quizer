"use client";

import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import clsx from "clsx";
import { useState } from "react";

export default function Option({
  isCorrect,
  optionText,
}: Pick<QuestionCardType, "options">["options"][number]) {
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
