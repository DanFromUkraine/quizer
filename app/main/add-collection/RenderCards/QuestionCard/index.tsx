import { useEffect, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import RenderOptions from "./RenderOptions";
import { QuestionCardType } from "@/app/lib/db/addCollectionPageDB";

export default function QuestionCard({
  id,
  questionTitle,
  options,
  index,
}: QuestionCardType & {
  index: number;
}) {
  const debounce = useMemo(createDebounce, []);
  const methods = useForm({
    defaultValues: {
      questionTitle,
      options,
    },
  });

  const data = methods.watch();

  useEffect(() => {
    if (methods.formState.isDirty) {
    }
  }, [data]);

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-3 w-full border border-lightGray p-6 rounded-normal">
        <div className="flex justify-between items-center">
          <p className="px-3 py-1.5 text-darker w-fit font-semibold bg-fillbg rounded-normal">
            Картка №{index}
          </p>
          <FaRegTrashAlt className="text-xl text-questTextColor" />
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

export function createDebounce() {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (callback: () => void, wait: number) => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
}
