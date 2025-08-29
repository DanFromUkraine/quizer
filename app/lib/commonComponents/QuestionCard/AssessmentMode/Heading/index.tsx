import CardIndex from "./CardIndex";
import QuestionTitle from "./Title";

export default function Heading({
  questionTitle,
  index,
}: {
  questionTitle: string;
  index: number;
}) {
  return (
    <div className="flex justify-between">
      <QuestionTitle title={questionTitle} />
      <CardIndex index={index} />
    </div>
  );
}
