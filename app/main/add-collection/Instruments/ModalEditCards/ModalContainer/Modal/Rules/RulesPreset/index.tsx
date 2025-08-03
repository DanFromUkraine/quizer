import Braces from "../../../Braces";
import OptionRules from "./OptionRules";
import QuestionRules from "./QuestionRules";

export default function RulesPreset() {
  return (
    <Braces colorPriority={4}>
      <h4>Preset rules</h4>
      <QuestionRules />
      <OptionRules />
    </Braces>
  );
}
