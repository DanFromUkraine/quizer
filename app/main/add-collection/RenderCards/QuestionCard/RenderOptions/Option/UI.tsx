import { FieldValues, UseFormRegister } from "react-hook-form";
import { FaCheck } from "react-icons/fa";

export default function OptionUI({
  index,
  register,
  onRemoveBtnClick,
}: {
  index: number;
  register: UseFormRegister<FieldValues>;
  onRemoveBtnClick: () => void;
}) {
  return (
    <div className="flex justify-between bg-fillbg rounded-normal overflow-hidden w-full text-questTextColor font-semibold">
      <label className="group/option w-full flex has-checked:bg-green-300">
        <div className="relative w-8 h-full flex justify-center items-center bg-red-500 has-checked:bg-green-500 duration-150">
          <input
            type="checkbox"
            {...register(`options.${index}.isCorrect`)}
            className="absolute inset-0 opacity-0 z-20 peer"
            onInput={() => {}}
          />
          <FaCheck className="hidden peer-checked:flex text-white" />
        </div>
        <input
          type="text"
          {...register(`options.${index}.optionText`)}
          className="w-full p-3 duration-150"
        />
      </label>

      <div
        className="bg-questTextColor h-12 min-w-8 flex justify-center items-center hover:bg-red-500 duration-150"
        onClick={onRemoveBtnClick}
      >
        <span className="w-2/3 h-1.5 bg-white " />
      </div>
    </div>
  );
}
