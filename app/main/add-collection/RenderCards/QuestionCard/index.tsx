import {
  useOnClickDeleteCard
} from "@/app/lib/db/AddCollectionPageDB";
import { CreateModeQuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useStayUpdated } from "./client";
import QuestionCardUI from "./UI";

export default memo(function QuestionCard({
  id,
  questionTitle,
  options,
}: CreateModeQuestionCardType) {
  const methods = useForm<CreateModeQuestionCardType>({
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
