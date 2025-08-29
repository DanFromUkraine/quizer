"use client";

import { FormProvider, useForm } from "react-hook-form";
import RenderTextArea from "./RenderTextArea";
import Rules from "./Rules";
import Braces from "../Braces";

type ModalForm = {
  questionRules: {
    start: {
      numberAndDot: boolean;
      custom: string[];
    };
    end: {
      questionMark: boolean;
      colon: boolean;
      endsWithFirstOption: boolean;
      custom: string[];
    };
    customRegex: string;
  };
  optionRules: {
    start: {
      BigLatinSymbolDot: boolean;
      custom: string[];
    };
    end: {
      endsWithNextOption: boolean;
      custom: string[];
    };
    customRegex: string;
  };
  text: string;
};

export default function Modal() {
  const methods = useForm<ModalForm>();

  return (
    <FormProvider {...methods}>
      <form className="w-8/12 bg-gray-700 h-fit py-5 px-5 rounded-2xl">
        <Braces colorPriority={1} classNameParent="h-full">
          <h2 className="text-white text-3xl font-semibold mb-5">
            Editing cards as a text
          </h2>
          <Rules />
          <RenderTextArea />
        </Braces>
      </form>
    </FormProvider>
  );
}
