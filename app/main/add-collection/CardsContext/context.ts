'use client';

import { CreateModeQuestionCardType } from '@/app/lib/db/ObservableCreateCollectionDB/types';
import getContextEnhancedReceiver from '@/app/lib/utils/getContextReceiver';
import { createContext, Dispatch, SetStateAction } from 'react';

export const CardsContext = createContext<{
        cards: CreateModeQuestionCardType[];
        setCardsStateOnly: Dispatch<
                SetStateAction<CreateModeQuestionCardType[]>
        >;
}>({
        cards: [],
        setCardsStateOnly() {}
});

export const useCardsContext = getContextEnhancedReceiver({
        contextName: 'Cards context',
        Context: CardsContext
});
