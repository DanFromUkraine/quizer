import { FormProvider, useForm } from "react-hook-form";
import { QuestionCardCreateModeProps } from "../types.d";
import CardIndex from "./CardIndex";
import { FaRegTrashAlt } from "react-icons/fa";
import { QuestionTitle } from "./QuestionTitle";
import RenderOptions from "./RenderOptions";
import { CreateModeQuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import { useOnClickDeleteCard } from "@/app/lib/db/AddCollectionPageDB";
import { useStayUpdated } from "./client";

export default function CreateModeImplementation({
  id,
  questionTitle,
  options,
}: QuestionCardCreateModeProps) {
  const methods = useForm<CreateModeQuestionCardType>({
    defaultValues: {
      id,
      questionTitle,
      options,
    },
  });

  useStayUpdated(methods);
  const { onClickDeleteCard } = useOnClickDeleteCard(id);

  return (
    <FormProvider {...methods}>
      <form className="questionCard">
        <div className="flex justify-between items-center">
          <CardIndex />
          <FaRegTrashAlt
            className="text-xl text-questTextColor"
            onClick={onClickDeleteCard}
          />
        </div>
        <QuestionTitle />
        <RenderOptions />
      </form>
    </FormProvider>
  );
}
