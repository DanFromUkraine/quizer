import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import Heading from "./Heading";
import RenderOptions from "./RenderOptions";

export default function QuestionCard({
  questionTitle,
  index,
  options,
}: QuestionCardType & { index: number }) {
  return (
    <div className="max-w-3xl flex flex-col gap-3 w-full border border-lightGray p-6 rounded-normal">
      <Heading questionTitle={questionTitle} index={index} />
      <RenderOptions options={options} />
    </div>
  );
}
