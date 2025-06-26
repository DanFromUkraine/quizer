import { FormEventHandler, useEffect, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import RenderOptions from "./RenderOptions";
import clsx from "clsx";
import { QuestionCardType } from "@/app/lib/db/AddCollectionPageDB/types";
import { useServiceOneCard } from "@/app/lib/db/AddCollectionPageDB";

export default function QuestionCard({
  id,
  questionTitle,
  options,
  index,
}: QuestionCardType & {
  index: number;
}) {
  const methods = useForm({
    defaultValues: {
      questionTitle,
      options,
    },
  });

  const { lazyUpdateCard, deleteCard } = useServiceOneCard();
  const data = methods.watch();
  useEffect(() => {
    if (methods.formState.isDirty) {
      lazyUpdateCard(
        {
          id,
          ...data,
        },
        () => methods.reset(methods.getValues())
      );
    }
  }, [data]);

  const onDeleteBtnClick = () => {
    deleteCard(id);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-3 w-full border border-lightGray p-6 rounded-normal">
        <div className="flex justify-between items-center">
          <p className="px-3 py-1.5 text-darker w-fit font-semibold bg-fillbg rounded-normal">
            Картка №{index + 1}
          </p>
          <FaRegTrashAlt
            className="text-xl text-questTextColor"
            onClick={onDeleteBtnClick}
          />
        </div>
        <QuestionTitle />
        <RenderOptions />
      </form>
    </FormProvider>
  );
}

export function QuestionTitle() {
  const { register } = useFormContext();

  const onInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = e.nativeEvent.target as HTMLTextAreaElement;

    if (textarea && "style" in textarea) {
      textarea.style.height = "48px";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  return (
    <textarea
      placeholder="Введіть текст"
      className={clsx(
        "resize-none overflow-hidden w-full rounded-lg bg-transparent  outline-1 outline-alternateBorder px-6 box-border leading-5 py-3 focus:outline-white focus:outline-2 text-sm text-defaultText h-12"
      )}
      onInput={onInput}
      {...register("questionTitle")}
    />
  );
}
