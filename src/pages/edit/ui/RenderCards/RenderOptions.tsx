import { useMemo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { explicitCardsAtomFamily } from '@/src/jotai/mainAtoms';
import { addEmptyOptionAtom } from '@/src/jotai/optionAtoms';
import { EP_TEST_IDS } from '@/src/constants/testIds';
import { useCardProps } from './Card';
import Option from './Option';

export default function RenderOptions() {
    const { cardId } = useCardProps();
    const cardAtom = useMemo(() => explicitCardsAtomFamily(cardId), [cardId]);
    const { childrenIds } = useAtomValue(cardAtom);

    return (
        <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-1 gap-2.5 min-[640px]:grid-cols-2'>
                <NoOptionsMessage isVisible={childrenIds.length === 0} />
                {childrenIds.map((optionId, optionIndex) => (
                    <Option
                        key={optionId}
                        optionId={optionId}
                        optionIndex={optionIndex}
                    />
                ))}
            </div>
            <AddEmptyOptionButton />
        </div>
    );
}

function NoOptionsMessage({ isVisible }: { isVisible: boolean }) {
    return (
        <h2
            data-visible={isVisible}
            className='m-auto hidden text-lg font-semibold text-[#666b78] data-[visible=true]:col-span-full data-[visible=true]:!flex'>
            No options yet
        </h2>
    );
}

function AddEmptyOptionButton() {
    const { cardId } = useCardProps();
    const addEmptyOption = useSetAtom(addEmptyOptionAtom);

    return (
        <button
            type='button'
            data-testid={EP_TEST_IDS.card.explicitCardContent.newOptionBtn}
            onClick={() => void addEmptyOption(cardId)}
            className='my-0 w-full cursor-pointer rounded-xl border-[3px] border-dashed border-[#2563eb] bg-transparent p-3 font-bold text-[#2563eb] duration-100 hover:border-[#1d4ed8] hover:bg-[#eff6ff] hover:text-[#1d4ed8]'>
            + Add option
        </button>
    );
}
