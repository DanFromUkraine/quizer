import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import { memo, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import QuestionCardUI from "./UI";
import {
  useLazyUpdateCard,
  useOnClickDeleteCard,
} from "@/app/lib/db/AddCollectionPageDB";

function useStayUpdated(methods: UseFormReturn<QuestionCardType>) {
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

export default memo(function QuestionCard({
  id,
  questionTitle,
  options,
}: QuestionCardType) {
  const methods = useForm<QuestionCardType>({
    defaultValues: {
      id,
      questionTitle,
      options,
    },
  });

  useStayUpdated(methods);
  const { onClickDeleteCard } = useOnClickDeleteCard(id);

  return <QuestionCardUI {...{ methods, onClickDeleteCard }} />;
});

function calculateNumberOfCorrectOptions(
  options: Pick<QuestionCardType, "options">["options"]
) {
  return options.reduce(
    (accum, { isCorrect }) => (isCorrect ? accum + 1 : accum),
    0
  );
}
