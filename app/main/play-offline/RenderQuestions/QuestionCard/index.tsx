import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import { memo } from "react";
import Heading from "./Heading";
import NumberOfCorrectOptions from "./NumberOfCorrectOptions";
import RenderOptions from "./RenderOptions";

export default memo(function QuestionCard({
  questionTitle,
  index,
  numberOfCorrectAnswers,
  options,
}: QuestionCardType & { index: number }) {
  return (
    <div className="max-w-3xl flex flex-col gap-3 w-full border border-lightGray p-6 rounded-normal">
      <Heading questionTitle={questionTitle} index={index} />
      <NumberOfCorrectOptions {...{ numberOfCorrectAnswers }} />
      <RenderOptions
        options={options}
        isMultiOption={numberOfCorrectAnswers > 1}
        questionIndex={index}
      />
    </div>
  );
});
