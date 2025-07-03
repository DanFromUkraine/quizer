import { FormProvider, UseFormReturn } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { QuestionTitle } from ".";
import RenderOptions from "./RenderOptions";
import { QuestionCardTypePure } from "@/app/lib/DBs/add-collection-DB";

export default function QuestionCardUI({
  methods,
  index,
  onDelete,
}: {
  methods: UseFormReturn<QuestionCardTypePure>;
  index: number;
  onDelete: () => void;
}) {
  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-3 w-full border border-lightGray p-6 rounded-normal">
        <div className="flex justify-between items-center">
          <p className="px-3 py-1.5 text-darker w-fit font-semibold bg-fillbg rounded-normal">
            Картка №{index}
          </p>
          <FaRegTrashAlt
            className="text-xl text-questTextColor"
            onClick={onDelete}
          />
        </div>
        <QuestionTitle />
        <RenderOptions />
      </form>
    </FormProvider>
  );
}
