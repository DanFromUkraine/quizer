'use client';

import { createContext, ReactNode, useContext } from 'react';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { useSetAtom } from 'jotai';
import { deleteExplicitCardAtom } from '@/src/jotai/cardAtoms';
import { FaRegTrashAlt } from 'react-icons/fa';

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
        const { cardId } = useCardProps();
        const deleteCard = useSetAtom(deleteExplicitCardAtom);
        const onClick = () => {
                deleteCard(cardId);
        };

        return (
                <FaRegTrashAlt
                        data-testid='remove-card-btn'
                        className='text-xl text-questTextColor'
                        onClick={onClick}
                />
        );
}
