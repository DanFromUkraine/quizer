function getCorrectWordForm(numOfCorrAnswers: number) {
  const BASE = "correct answer";
  if (numOfCorrAnswers === 1) return BASE;
  else return BASE + "s";
}

export default function NumberOfCorrectOptions({
  numberOfCorrectAnswers,
}: {
  numberOfCorrectAnswers: number;
}) {
  return (
    <div className="text-gray-500 text-sm">
      {numberOfCorrectAnswers} {getCorrectWordForm(numberOfCorrectAnswers)}
    </div>
  );
}
