import { usePageTitle } from "@/app/lib/db/AddCollectionPageDB";
import { FormEventHandler } from "react";
import CollectionTitleUI from "./UI";

export default function CollectionTitle() {
  const { title, lazyUpdateTitle } = usePageTitle();

  const onInput: FormEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement;
    lazyUpdateTitle(target.value);
  };

  return <CollectionTitleUI {...{ title, onInput }} />;
}
