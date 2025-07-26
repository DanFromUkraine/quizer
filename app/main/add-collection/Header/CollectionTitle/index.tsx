import { FormEventHandler, useRef } from "react";
import CollectionTitleUI from "./UI";
import { useFormContext } from "react-hook-form";

export default function CollectionTitle() {
  const titleRef = useRef<HTMLInputElement>(null);
  const { control } = useFormContext();

  return <CollectionTitleUI {...{ ref: titleRef, control }} />;
}
