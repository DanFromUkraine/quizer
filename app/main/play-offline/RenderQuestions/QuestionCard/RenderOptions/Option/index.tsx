import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";

export default function Option({
  isCorrect,
  optionText,
}: Pick<QuestionCardType, "options">["options"][number]) {
  return (
    <div className="w-full h-full min-h-[60px] p-4 border-2 rounded-normal border-lightGray ">
      {optionText}
    </div>
  );
}
