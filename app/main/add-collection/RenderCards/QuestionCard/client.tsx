"use client";

import { useLazyUpdateCard } from "@/app/lib/db/AddCollectionPageDB";
import { CreateModeQuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

export function useStayUpdated(
  methods: UseFormReturn<CreateModeQuestionCardType>
) {
  const data = methods.watch();
  const { lazyUpdateCard } = useLazyUpdateCard();

  useEffect(() => {
    if (methods.formState.isDirty) {
      lazyUpdateCard({
        ...data,
        numberOfCorrectAnswers: calculateNumberOfCorrectOptions(data.options),
      });
    }
  }, [data]);
}

function calculateNumberOfCorrectOptions(
  options: Pick<CreateModeQuestionCardType, "options">["options"]
) {
  return options.reduce(
    (accum, { isCorrect }) => (isCorrect ? accum + 1 : accum),
    0
  );
}
