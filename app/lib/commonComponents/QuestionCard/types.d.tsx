import { CreateModeQuestionCardType } from '../../db/ObservableCreateCollectionDB/types';
import { AssessmentModeQuestionCardType } from '../../db/History/types';

export type ModesAvailable = 'create-mode' | 'assessment-mode' | 'result-mode';

export interface QuestionCardGeneralProps {
        questionTitle: string;
}

export interface QuestionCardCreateModeProps
        extends QuestionCardGeneralProps,
                CreateModeQuestionCardType {
        mode: 'create-mode';
}

export interface QuestionCardAssessmentModeProps
        extends QuestionCardGeneralProps,
                AssessmentModeQuestionCardType {
        mode: 'assessment-mode';
        cardIndex: number;
        anyOptionChosen: boolean;
}

export interface QuestionCardResultModeProps
        extends QuestionCardGeneralProps,
                AssessmentModeQuestionCardType {
        mode: 'result-mode';
        cardIndex: number;
}

type ModeMap = {
        'create-mode': QuestionCardCreateModeProps;
        'assessment-mode': QuestionCardAssessmentModeProps;
        'result-mode': QuestionCardResultModeProps;
};

export type PickProps<T extends ModesAvailable> = ModeMap[T]; // логіка, що буде вибирати пропси по конкретному моду
