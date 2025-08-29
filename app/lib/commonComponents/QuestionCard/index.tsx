/*

Need to create component RenderQuestionCards to render question cards in 3 modes: 
1. When creating question cards
2. When completing the test
3. When seeing the result of the test


Problems:
1. Mode 1 requeires react-hook-form but modes 2 & 3 don't.
2. All of them use very different custom hooks

it actually is a reason, why it is impossimble to make such component. But I think it might be much easier to implement QuestionCard component only

*/

import { JSX } from "react";
import {
  ModesAvailable,
  PickProps,
  QuestionCardAssessmentModeProps,
  QuestionCardCreateModeProps,
  QuestionCardResultModeProps,
} from "./index.d";
import AssessmentModeImplementation from "./AssessmentMode";
import CreateModeImplementation from "./CreateMode";

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
