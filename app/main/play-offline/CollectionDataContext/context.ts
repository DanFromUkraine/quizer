'use client';

import { createContext } from 'react';
import { CollectionStoryIncomplete } from '../../../lib/db/History/types';
import getContextEnhancedReceiver from '../../../lib/utils/getContextReceiver';

export const CollectionContextIncomplete =
        createContext<CollectionStoryIncomplete | null>(null);

export const useCollectionContext =
        getContextEnhancedReceiver<CollectionStoryIncomplete | null>({
                Context: CollectionContextIncomplete,
                contextName: 'Collection Data Context'
        });
