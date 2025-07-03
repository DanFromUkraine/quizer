import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import Option from "./Option";

export default function RenderOptions({
  options,
}: Pick<QuestionCardType, "options">) {
  return (
    <div className="grid grid-cols-2 gap-6 h-fit">
      {options.map((opt, i) => (
        <Option key={i} {...opt} />
      ))}
    </div>
  );
}
