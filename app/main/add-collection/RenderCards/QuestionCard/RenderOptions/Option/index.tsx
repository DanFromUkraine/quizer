import { useState } from "react";
import { useFormContext } from "react-hook-form";
import OptionUI from "./UI";

export default function Option({
  index,
  remove,
}: {
  index: number;
  remove: (i: number) => void;
}) {
  const { register } = useFormContext();
  const onRemoveBtnClick = () => remove(index);

  return (
    <OptionUI
      index={index}
      register={register}
      onRemoveBtnClick={onRemoveBtnClick}
      
    />
  );
}
