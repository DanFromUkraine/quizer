export default function QuestionTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-col justify-center gap-6">
      <h3 className="font-semibold">Therm</h3>
      <h2 className="text-xl w-full">{title}</h2>
    </div>
  );
}
