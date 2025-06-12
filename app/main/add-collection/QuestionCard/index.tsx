import { useEffect, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import RenderOptions from "./RenderOptions";

export type OptionType = {
  isCorrect: boolean;
  optionText: string;
};

export type QuestionCardType = {
  questionTitle: string;
  options: OptionType[];
};

function useQCSS(id: string) {
  // temporary implementation
  const storage = typeof window !== "undefined" ? sessionStorage : null;

  const getQC = () => {
    const rawData = storage?.getItem(id);
    const placeholder = {
      questionTitle: "",
      options: [],
    };
    if (rawData) {
      return JSON.parse(rawData);
    } else {
      storage?.setItem(id, JSON.stringify(placeholder));
      return placeholder;
    }
  };

  const setQC = (newVal: QuestionCardType) => {
    storage?.setItem(id, JSON.stringify(newVal));
  };

  const deleteQC = () => {
    storage?.removeItem(id);
  };

  return {
    lastData: getQC(),
    setQC,
    deleteQC,
  };
}

export default function QuestionCard({
  id,
  index,
}: {
  id: string;
  index: number;
}) {
  const { deleteQC, lastData, setQC } = useQCSS(id);
  const debounce = useMemo(createDebounce, []);
  const methods = useForm({
    defaultValues: lastData,
  });

  const data = methods.watch();

  useEffect(() => {
    if (methods.formState.isDirty) {
      debounce(() => {
        setQC(data);
        console.log("data write");
      }, 1000);
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
