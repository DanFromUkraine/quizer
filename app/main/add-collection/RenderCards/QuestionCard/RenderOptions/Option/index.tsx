import { useState } from "react";
import { useFormContext } from "react-hook-form";
import OptionUI from "./UI";
import { useDebounceInputAndUpdateStatusBar } from "@/app/lib/debounceInput";

export default function Option({
  index,
  remove,
}: {
  index: number;
  remove: (i: number) => void;
}) {
  const { control } = useFormContext();
  const onRemoveBtnClick = () => remove(index);
  const onDebounceChange = useDebounceInputAndUpdateStatusBar();

  return (
    <OptionUI
      index={index}
      onRemoveBtnClick={onRemoveBtnClick}
      onDebounceChange={onDebounceChange}
      control={control}
    />
  );
}
