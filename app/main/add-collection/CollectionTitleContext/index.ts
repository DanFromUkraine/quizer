'use client';

import createSimpleContextProviderPair from '@/app/lib/utils/createSimpleContext';
import getContextEnhancedReceiver from '@/app/lib/utils/getContextReceiver';
import { Dispatch, SetStateAction, useState } from 'react';

function useInitCollectionTitle() {
        const [collectionTitle, setCollectionTitle] = useState('');

        return { collectionTitle, setCollectionTitle };
}

type CollectionTitle = {
        collectionTitle: string;
        setCollectionTitle: Dispatch<SetStateAction<string>>;
};

export const [CollectionTitleContext, CollectionTitleContextProvider] =
        createSimpleContextProviderPair<CollectionTitle>({
                defaultData: {
                        collectionTitle: '',
                        setCollectionTitle: () => {}
                },
                useGetData: useInitCollectionTitle
        });

export const useCollectionTitleState = getContextEnhancedReceiver({
        contextName: 'Collection title',
        Context: CollectionTitleContext
});
