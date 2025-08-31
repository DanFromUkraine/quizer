import { InputHTMLAttributes } from "react";

export type AvailableInputTypes = "password" | "text" | "number";

export type InputContainerProps = {
  inputType: AvailableInputTypes;
  clearable: boolean;
  inputName: string;
  inputAttributes: InputHTMLAttributes;
  onClearButtonClick: undefined;
};

export interface Clearable {
  clearable: true;
  onClearButtonClick: () => void;
}

export interface InputContainerPropsIfClearable
  extends InputContainerProps,
    Clearable {}
