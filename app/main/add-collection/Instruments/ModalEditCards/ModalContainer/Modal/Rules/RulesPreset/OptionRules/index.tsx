"use client";

import { useFormContext } from "react-hook-form";
import Braces from "../../../../Braces";
import Option from "../Option";

export default function OptionRules() {
  const { register } = useFormContext();

  return (
    <Braces colorPriority={5}>
      <div>
        <h5>Start:</h5>
        <Braces colorPriority={6}>
          <Option {...register("optionRules.start.BigLatinSymbolDot")}>
            <div></div>
          </Option>
        </Braces>
      </div>
      <div>
        <h5>End:</h5>
        <Braces colorPriority={6}>
          <div></div>
        </Braces>
      </div>
    </Braces>
  );
}
