import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
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

  console.log({ lastData });

  const {
    register,
    control,
    watch,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: lastData,
  });

  console.log("render");

  const data = watch();

  const debounce = useMemo(createDebounce, []);

  useEffect(() => {
    if (isDirty) {
      debounce(() => {
        setQC(data);
        console.log("data write");
      }, 1000);
    }
  }, [data]);

  return (
    <form className="flex flex-col gap-3 w-full border border-lightGray p-6 rounded-normal">
      <div className="flex justify-between items-center">
        <p className="px-3 py-1.5 text-darker w-fit font-semibold bg-fillbg rounded-normal">
          Картка №{index}
        </p>
        <FaRegTrashAlt className="text-xl text-questTextColor" />
      </div>
      <input
        placeholder="Введіть якусь інфу"
        {...register("questionTitle")}
        className="text-questTextColor font-semibold focus:outline-none"
      />
      <RenderOptions control={control} register={register} />
    </form>
  );
}

export function createDebounce() {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (callback: () => void, wait: number) => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
}
