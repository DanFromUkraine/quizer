"use client";

import Braces from "../../Braces";
import RenderCustomRules from "./CustomRules";
import RulesPreset from "./RulesPreset";

export default function Rules() {
  return (
    <Braces colorPriority={2}>
      <h3 className="text-white text-2xl w-full font-semibold mb-5">
        Text parsing rules
      </h3>
      <RulesPreset />
      <RenderCustomRules />
    </Braces>
  );
}
