import { UseFormRegister } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { OptionType, QuestionCardType } from "../..";
import clsx from "clsx";
import { useState } from "react";

export default function Option({
  index,
  register,
  optionData: { isCorrect },
}: {
  index: number;
  register: UseFormRegister<QuestionCardType>;
  optionData: OptionType;
}) {
  const [checked, setChecked] = useState(isCorrect);

  return (
    <div className="flex justify-between bg-fillbg rounded-normal overflow-hidden w-full text-questTextColor font-semibold">
      <label className="w-8 h-full relative rounded-l-normal flex justify-center items-center bg-red-500 has-checked:bg-green-500 hover:bg-red-300 has-checked:hover:bg-green-300 duration-150">
        <input
          type="checkbox"
          {...register(`options.${index}.isCorrect`)}
          onChange={() => {
            setChecked((prev) => !prev);
          }}
          className="absolute top-0 left-0 w-full h-full opacity-0 z-20 peer "
        />
        <FaCheck className="hidden peer-checked:flex" />
        <ImCross className="flex peer-checked:hidden " />
      </label>

      <input
        type="text"
        placeholder=""
        {...register(`options.${index}.optionText`)}
        className={clsx("w-full p-3 focus:bg-fillbg bg-fillbg duration-150", {
          "bg-green-300": checked,
          "bg-red-300": !checked,
        })}
      />
      <div className="bg-questTextColor h-full min-w-8 flex justify-center items-center hover:bg-red-500 duration-150">
        <span className="w-2/3 h-1.5 bg-white " />
      </div>
    </div>
  );
}
