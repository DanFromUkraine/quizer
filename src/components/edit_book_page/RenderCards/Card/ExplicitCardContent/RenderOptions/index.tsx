'use client';

import { useAtomValue } from 'jotai';
import Option from './Option';
import { explicitCardsAtomFamily } from '@/src/jotai/mainAtoms';
import { useMemo } from 'react';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import AddEmptyOptionButton from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/AddEmtpyOptionButton';
import {
        NoOptionsMessage
} from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/UI';

export default function RenderOptions() {
        const { cardId } = useCardProps();
        const cardAtom = useMemo(() => explicitCardsAtomFamily(cardId), []);
        const { childrenIds } = useAtomValue(cardAtom);

        return (
                <div className='flex flex-col gap-3 p-3 bg-gray-100 rounded-lg'>
                        <NoOptionsMessage isVisible={childrenIds.length === 0} />
                        {childrenIds.map((optionId, optionIndex) => (
                                <Option
                                        key={optionId}
                                        {...{
                                                optionId,
                                                optionIndex
                                        }}
                                />
                        ))}
                        <AddEmptyOptionButton />
                </div>
        );
}
