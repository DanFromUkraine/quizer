"use client";

import { useFormContext } from "react-hook-form";
import Braces from "../../../../Braces";
import Option from "../Option";

export default function QuestionRules() {
  const { register } = useFormContext();

  return (
    <Braces colorPriority={5}>
      <h5>Rules to parse question</h5>

      <div>
        <h5>Start:</h5>
        <Braces colorPriority={6}>
          <Option {...register("questionRules.start.numberAndDot")}>
            some content
          </Option>
        </Braces>
      </div>
      <div>
        <h5>End:</h5>
        <Braces colorPriority={6}>
          <div />
        </Braces>
      </div>
    </Braces>
  );
}
