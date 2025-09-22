'use client';

import { useAtomValue } from 'jotai';
import Option from './Option';
import { cardsFamilyAtom } from '@/src/jotai/mainAtoms';
import { useMemo } from 'react';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import AddEmptyOptionButton from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/AddEmtpyOptionButton';

export default function RenderOptions() {
        const { cardId } = useCardProps();
        const cardAtom = useMemo(() => cardsFamilyAtom(cardId), []);
        const { childrenIds } = useAtomValue(cardAtom);

        return (
                <div className='flex flex-col gap-3'>
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
