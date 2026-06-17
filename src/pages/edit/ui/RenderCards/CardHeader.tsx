import { useCallback } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { FaXmark } from 'react-icons/fa6';
import {
    deleteExplicitCardAtom,
    deleteShortCardAtom
} from '@/src/jotai/cardAtoms';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import { useCardIndex, useCardProps } from './Card';

export default function CardHeader() {
    return (
        <div className='flex items-center justify-between'>
            <CardIndex />
            <DeleteCardButton />
        </div>
    );
}

function CardIndex() {
    const index = useCardIndex();

    return (
        <p className='rounded-lg bg-[#eef0f4] px-2.5 py-1 text-[13px] font-semibold text-[#666b78]'>
            №{index + 1}
        </p>
    );
}

function DeleteCardButton() {
    const { cardId, cardType } = useCardProps();

    const onClick = useAtomCallback(
        useCallback(
            async (_get, set) => {
                if (cardType === 'explicit') {
                    await set(deleteExplicitCardAtom, cardId);
                } else {
                    await set(deleteShortCardAtom, cardId);
                }
            },
            [cardId, cardType]
        )
    );

    return (
        <button
            type='button'
            aria-label='Delete card'
            data-testid={EP_TEST_IDS.card.deleteBtn}
            onClick={() => void onClick()}
            className='cursor-pointer border-0 bg-transparent p-1 text-xl leading-none text-[#8b92a1] duration-100 hover:text-red-500'>
            <FaXmark />
        </button>
    );
}
