import { FormEventHandler } from "react";

export default function CollectionTitleUI({
  title,
  onInput,
}: {
  title: string;
  onInput: FormEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      type="text"
      placeholder="Введіть заголовок"
      className="px-6 py-1.5 w-full text-[#5C5E64] text-2xl font-semibold focus:outline-none mb-8"
      defaultValue={title}
      onInput={onInput}
    />
  );
}
