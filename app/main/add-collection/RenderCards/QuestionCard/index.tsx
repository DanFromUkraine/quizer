import { useEffect, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import RenderOptions from "./RenderOptions";
import {
  QuestionCardType,
  useServiceOneCard,
} from "@/app/lib/db/addCollectionPageDB";

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
      lazyUpdateCard({
        id,
        ...data,
      });
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
            Картка №{index}
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
  return (
    <input
      placeholder="Введіть якусь інфу"
      {...register("questionTitle")}
      className="text-questTextColor font-semibold focus:outline-none"
    />
  );
}
