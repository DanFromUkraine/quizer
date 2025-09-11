import { Observable } from '@/app/lib/utils/observableLogic';
import getContextEnhancedReceiver from '@/app/lib/utils/getContextReceiver';
import { createContext } from 'react';
import { DB } from '@/app/lib/db/types';
import { HistoryDBInterface } from '@/app/lib/db/History/types';

export const HistoryDbContext = createContext<Observable<HistoryDBInterface> | null>(null);

export const useObservableContext = getContextEnhancedReceiver({
        contextName: 'Observable Main DB schema',
        Context: HistoryDbContext
});

export type HistoryDB = DB<HistoryDBInterface>;