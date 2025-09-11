import { CreateModeQuestionCardType } from '@/app/lib/db/ObservableCreateCollectionDB/types';




export const EMPTY_CARD_TEMPLATE = {
        questionTitle: '',
        options: [],
        numberOfCorrectAnswers: 0
} as Omit<CreateModeQuestionCardType, 'id'>;
