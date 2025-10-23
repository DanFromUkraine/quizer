'use client';

import { createContext, ReactNode, useCallback, useContext } from 'react';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import {
        deleteExplicitCardAtom,
        deleteShortCardAtom
} from '@/src/jotai/cardAtoms';
import { FaRegTrashAlt } from 'react-icons/fa';
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
                <IndexContext.Provider value={value}>
                        {children}
                </IndexContext.Provider>
        );
}

export function CardIndex() {
        const index = useContext(IndexContext);

        return (
                <p className='px-3 py-1.5 text-darker w-fit font-semibold bg-fillbg rounded-normal'>
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
                <FaRegTrashAlt
                        data-testid={EP_TEST_IDS.card.deleteBtn}
                        className='text-xl text-questTextColor'
                        onClick={onClick}
                />
        );
}
