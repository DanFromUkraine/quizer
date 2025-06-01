import { FormEventHandler } from "react";
import { useFormContext } from "react-hook-form";
import CardsInputUI from "./UI";

export default function CardsInput() {
  const { register } = useFormContext();

  const onInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = e.nativeEvent.target as HTMLTextAreaElement;

    if (textarea && "style" in textarea) {
      textarea.style.height = "48px";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  return <CardsInputUI register={register} onInput={onInput} />;
}
