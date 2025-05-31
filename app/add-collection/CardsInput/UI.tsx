import clsx from "clsx";
import { FormEventHandler } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export default function CardsInputUI({
  onInput,
  register,
}: {
  onInput: FormEventHandler<HTMLTextAreaElement>;
  register: UseFormRegister<FieldValues>;
}) {
  return (
    <textarea
      placeholder="Введіть текст"
      className={clsx(
        "resize-none overflow-hidden w-full rounded-lg bg-transparent  outline-1 outline-alternateBorder px-6 box-border leading-5 py-3 focus:outline-white focus:outline-2 text-sm text-defaultText h-12"
      )}
      onInput={onInput}
      {...register("cardsText")}
    />
  );
}
