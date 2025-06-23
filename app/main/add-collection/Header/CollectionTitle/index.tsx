import { usePageTitle } from "@/app/lib/db/addCollectionPageDB";
import { FormEventHandler } from "react";

export default function CollectionTitle() {
  const { title, lazyUpdateTitle } = usePageTitle();

  const onInput: FormEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement;
    lazyUpdateTitle(target.value);
  };

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
