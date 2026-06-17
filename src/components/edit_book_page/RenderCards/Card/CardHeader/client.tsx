'use client';

import { createContext, ReactNode, useCallback, useContext } from 'react';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import {
    deleteExplicitCardAtom,
    deleteShortCardAtom
} from '@/src/jotai/cardAtoms';
import { FaXmark } from 'react-icons/fa6';
import { useAtomCallback } from 'jotai/utils';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export const IndexContext = createContext<number>(0);

export function IndexContextProvider({
    children,
    value
}: {
    children: ReactNode;
    value: number;
}) {
    return (
        <IndexContext.Provider value={value}>{children}</IndexContext.Provider>
    );
}

export function CardIndex() {
    const index = useContext(IndexContext);

    return (
        <p className='rounded-lg bg-[#eef0f4] px-2.5 py-1 text-[13px] font-semibold text-[#666b78]'>
            №{index + 1}
        </p>
    );
}

export function DeleteCardButton() {
    const { cardId, cardType } = useCardProps();

    const onClick = useAtomCallback(
        useCallback(async (_get, set) => {
            if (cardType === 'explicit') {
                await set(deleteExplicitCardAtom, cardId);
            } else {
                await set(deleteShortCardAtom, cardId);
            }
        }, [])
    );

    return (
        <button
            type='button'
            aria-label='Delete card'
            data-testid={EP_TEST_IDS.card.deleteBtn}
            onClick={onClick}
            className='cursor-pointer border-0 bg-transparent p-1 text-xl leading-none text-[#8b92a1] duration-100 hover:text-red-500'>
            <FaXmark />
        </button>
    );
}
