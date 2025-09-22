'use client';

import { CollectionStoryComplete } from '@/app/lib/db/History/types';
import getContextEnhancedReceiver from '@/app/lib/jotai/getContextReceiver';
import { createContext } from 'react';

export const CollectionContextComplete =
        createContext<CollectionStoryComplete | null>(null);

export const useCollectionContextComplete = getContextEnhancedReceiver({
        Context: CollectionContextComplete,
        contextName: 'Book Context Complete'
});
