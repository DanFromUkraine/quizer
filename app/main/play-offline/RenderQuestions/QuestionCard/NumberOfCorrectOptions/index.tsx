import clsx from "clsx";

export default function NumberOfCorrectOptions({
  numberOfCorrectAnswers,
}: {
  numberOfCorrectAnswers: number;
}) {
  return (
    <div className={clsx("", { hidden: numberOfCorrectAnswers === 1 })}>
      {numberOfCorrectAnswers} correct answers
    </div>
  );
}
