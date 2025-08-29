import { AssessmentModeQuestionCardType } from "@/app/lib/db/History/types";
import Heading from "./Heading";
import NumberOfCorrectOptions from "./NumberOfCorrectOptions";
import RenderOptions from "./RenderOptions";

export default function AssessmentModeImplementation({
  options,
  questionTitle,
  cardIndex,
  numberOfCorrectAnswers,
}: AssessmentModeQuestionCardType & {
  cardIndex: number;
}) {
  return (
    <div className="max-w-3xl flex flex-col gap-3 w-full border border-lightGray p-6 rounded-normal">
      <Heading questionTitle={questionTitle} index={cardIndex} />
      <NumberOfCorrectOptions {...{ numberOfCorrectAnswers }} />
      <RenderOptions
        options={options}
        isMultiOption={numberOfCorrectAnswers > 1}
        questionIndex={cardIndex}
      />
    </div>
  );
}
