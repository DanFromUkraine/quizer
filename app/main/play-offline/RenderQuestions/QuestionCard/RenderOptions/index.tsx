import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import Option from "./Option";
import { TestOption } from "@/app/lib/db/History/types";

export default function RenderOptions({
  options,
  isMultiOption,
  questionIndex,
}: {
  options: TestOption[];
  isMultiOption: boolean;
  questionIndex: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-6 h-fit">
      {options.map((opt, i) => (
        <Option
          key={i}
          {...opt}
          optionIndex={i}
          questionIndex={questionIndex}
        />
      ))}
    </div>
  );
}
