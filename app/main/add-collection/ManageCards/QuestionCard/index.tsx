import { CardMethodsType, QuestionCardType } from "@/app/lib/DBs/add-collection-DB";
import { createDebounce } from "@/app/lib/utils";
import clsx from "clsx";
import { FormEventHandler, useEffect, useMemo } from "react";
import { useForm, useFormContext } from "react-hook-form";
import QuestionCardUI from "./UI";

export default function QuestionCard({
  _id,
  _rev,
  questionTitle,
  options,
  cardMethods,
  index,
}: QuestionCardType & {
  cardMethods: CardMethodsType;
  index: number;
}) {
  const { lazyUpdateCard, deleteCard } = cardMethods;
  const { updateCallback } = useMemo(createDebounce, []);

  const methods = useForm({
    defaultValues: {
      questionTitle,
      options,
    },
  });

  const onDelete = () => {
    deleteCard(_id, _rev as string);
  };

  const data = methods.watch();

  useEffect(() => {
    const updateCardCallback = () => {
      lazyUpdateCard({ ...data, _id, _rev });
    };

    if (methods.formState.isDirty) {
      updateCallback(updateCardCallback, 1000);
    }
  }, [data]);

  return <QuestionCardUI {...{ index, onDelete, methods }} />;
}

export function QuestionTitle() {
  const { register } = useFormContext();

  const onInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    console.log({ e, style1: e.nativeEvent.target });
    const textarea = e.nativeEvent.target as HTMLTextAreaElement;

    if (textarea && "style" in textarea) {
      textarea.style.height = "48px";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  return (
    <textarea
      placeholder="Введіть текст питання"
      className={clsx(
        "resize-none overflow-hidden settings-input focus:outline-none "
      )}
      onInput={onInput}
      {...register("questionTitle")}
    />
  );
}
