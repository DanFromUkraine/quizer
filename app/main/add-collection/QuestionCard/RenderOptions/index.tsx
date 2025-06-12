import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import Option from "./Option";
import { QuestionCardType } from "..";

export default function RenderOptions({
  control,
  register,
}: {
  control: Control<QuestionCardType, any, QuestionCardType>;
  register: UseFormRegister<QuestionCardType>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const onAddBtnClick = () => append({ isCorrect: false, optionText: "" });

  return (
    <div className="flex flex-col gap-3">
      {fields.map((data, index) => (
        <Option
          key={index}
          optionData={data}
          index={index}
          register={register}
        />
      ))}
      <button type="button" onClick={onAddBtnClick}>
        Add option
      </button>
    </div>
  );
}
