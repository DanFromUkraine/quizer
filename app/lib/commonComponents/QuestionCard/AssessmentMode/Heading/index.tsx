import CardIndexUI from "../../CardIndexUI";
import QuestionTitle from "./Title";

export default function Heading({
  questionTitle,
  index,
}: {
  questionTitle: string;
  index: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <CardIndexUI index={index} />
      <QuestionTitle title={questionTitle} />
    </div>
  );
}
