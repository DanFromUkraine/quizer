import Option from "./Option";
import { TestOption } from "@/app/lib/db/History/types";

export default function RenderOptions({
  options,
  isMultiOption,
  questionIndex,
  anyOptionChosen,
}: {
  options: TestOption[];
  isMultiOption: boolean;
  questionIndex: number;
  anyOptionChosen: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-6 h-fit">
      {options.map((opt, i) => (
        <Option
          key={i}
          {...opt}
          optionIndex={i}
          questionIndex={questionIndex}
          anyOptionChosen={anyOptionChosen}
        />
      ))}
    </div>
  );
}
