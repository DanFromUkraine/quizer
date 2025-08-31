import { JSX } from "react";
import {
  ModesAvailable,
  PickProps,
  QuestionCardAssessmentModeProps,
  QuestionCardCreateModeProps,
  QuestionCardResultModeProps,
} from "./types.d";
import AssessmentModeImplementation from "./AssessmentMode";
import CreateModeImplementation from "./CreateMode";
import "./styles.css";

export default function QuestionCard(
  props: QuestionCardCreateModeProps
): JSX.Element;
export default function QuestionCard(
  props: QuestionCardAssessmentModeProps
): JSX.Element;
export default function QuestionCard(
  props: QuestionCardResultModeProps
): JSX.Element;
export default function QuestionCard<T extends ModesAvailable>(
  props: PickProps<T>
): JSX.Element;

export default function QuestionCard<T extends ModesAvailable>({
  ...props
}: PickProps<T>) {
  if (props.mode === "assessment-mode")
    return <AssessmentModeImplementation {...props} />;
  else if (props.mode === "create-mode")
    return <CreateModeImplementation {...props} />;
}
