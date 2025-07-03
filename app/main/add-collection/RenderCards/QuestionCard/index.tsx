import { useServiceOneCard } from "@/app/lib/db/AddCollectionPageDB";
import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import QuestionCardUI from "./UI";
import { useAddCardOnShortcut } from "./client";

export default memo(function QuestionCard({
  id,
  questionTitle,
  options,
}: QuestionCardType & {
  // index: number;
}) {
  useAddCardOnShortcut();

  const methods = useForm<QuestionCardType>({
    defaultValues: {
      id: id,
      questionTitle,
      options,
    },
  });

  console.log("Question card render");

  const { lazyUpdateCard, deleteCard } = useServiceOneCard();

  const data = methods.watch();

  useEffect(() => {
    if (methods.formState.isDirty) {
      lazyUpdateCard(
        {
          ...data,
          numberOfCorrectAnswers: calculateNumberOfCorrectOptions(data.options),
        },
        () => {}
      );
    }
  }, [data]);

  const onDeleteBtnClick = () => deleteCard(id);

  return <QuestionCardUI {...{ methods, onDeleteBtnClick }} />;
});

function calculateNumberOfCorrectOptions(
  options: Pick<QuestionCardType, "options">["options"]
) {
  return options.reduce(
    (accum, { isCorrect }) => (isCorrect ? accum + 1 : accum),
    0
  );
}
