import clsx from "clsx";
import { ChangeEvent, FormEventHandler } from "react";
import {
  Control,
  Controller,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { QuestionTitle } from "./QuestionTitle";
import RenderOptions from "./RenderOptions";
import CardIndex from "./CardIndex";
import { CreateModeQuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";

export default function QuestionCardUI({
  onClickDeleteCard,
  methods,
}: {
  onClickDeleteCard: () => void;
  methods: UseFormReturn<CreateModeQuestionCardType>;
}) {
  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-3 w-full border border-lightGray p-6 rounded-normal">
        <div className="flex justify-between items-center">
          <CardIndex />
          <FaRegTrashAlt
            className="text-xl text-questTextColor"
            onClick={onClickDeleteCard}
          />
        </div>
        <QuestionTitle />
        <RenderOptions />
      </form>
    </FormProvider>
  );
}

export function QuestionTitleUI({
  onInput,
  control,
  onChange,
  defaultValue,
}: {
  onInput: FormEventHandler<HTMLTextAreaElement>;
  control: Control;
  onChange: (e: ChangeEvent, onChange: (e: ChangeEvent) => void) => void;
  defaultValue: string;
}) {
  return (
    <Controller
      name="questionTitle"
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <textarea
          {...field}
          placeholder="Enter text"
          onChange={(e) => onChange(e, field.onChange)}
          className={clsx(
            "resize-none overflow-hidden w-full rounded-lg bg-transparent  outline-1 outline-alternateBorder px-6 box-border leading-5 py-3 focus:outline-white focus:outline-2 text-sm text-defaultText h-12"
          )}
          onInput={onInput}
        />
      )}
    />
  );
}
