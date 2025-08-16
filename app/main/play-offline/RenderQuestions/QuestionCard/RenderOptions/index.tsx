import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import Option from "./Option";

export default function RenderOptions({
  options,
  isMultiOption,
}: Pick<QuestionCardType, "options"> & {
  isMultiOption: boolean;
  questionIndex: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-6 h-fit">
      {options.map((opt, i) => (
        <Option key={i} {...opt} index={i} />
      ))}
    </div>
  );
}
