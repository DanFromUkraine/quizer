import {
  useFieldArray,
  useFormContext
} from "react-hook-form";
import Option from "./Option";

export default function RenderOptions() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const onAddBtnClick = () => append({ isCorrect: false, optionText: "" });

  return (
    <div className="flex flex-col gap-3">
      {fields.map(({ id }, index) => (
        <Option key={id} index={index} remove={remove} />
      ))}
      <button type="button" onClick={onAddBtnClick}>
        Add option
      </button>
    </div>
  );
}
