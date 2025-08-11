import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import Heading from "./Heading";
import RenderOptions from "./RenderOptions";
import NumberOfCorrectOptions from "./NumberOfCorrectOptions";
import { useForm } from "react-hook-form";
import { memo } from "react";

export default memo(function QuestionCard({
  questionTitle,
  index,
  numberOfCorrectAnswers,
  options,
}: QuestionCardType & { index: number }) {
  const methods = useForm();

  return (
    <div className="max-w-3xl flex flex-col gap-3 w-full border border-lightGray p-6 rounded-normal">
      <Heading questionTitle={questionTitle} index={index} />
      <NumberOfCorrectOptions {...{ numberOfCorrectAnswers }} />
      <RenderOptions
        options={options}
        isMultiOption={numberOfCorrectAnswers > 1}
      />
    </div>
  );
});
