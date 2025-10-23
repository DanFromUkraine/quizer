import { MarkupModesUiList } from '@/src/types/updateCardsFromText';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export const MARKUP_MODES: MarkupModesUiList = [
        {
                modeId: 'mixed',
                title: 'Mixed',
                testId: EP_TEST_IDS.cardsAsTextDialog.mixedModeBtn
        },
        {
                modeId: 'short-only',
                title: 'Only term-definition cards',
                testId: EP_TEST_IDS.cardsAsTextDialog.shortCardsOnlyModeBtn
        }
];
