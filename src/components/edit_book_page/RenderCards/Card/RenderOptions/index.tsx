import { useAtomValue, useSetAtom } from 'jotai';
import Option from './Option';
import { addEmptyOptionAtom, cardsFamilyAtom } from '@/src/jotai/mainDbAtom';
import { useMemo } from 'react';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';

export default function RenderOptions() {
        const { cardId } = useCardProps();
        const cardAtom = useMemo(() => cardsFamilyAtom(cardId), []);
        const addEmptyOption = useSetAtom(addEmptyOptionAtom);
        const { optionsIds } = useAtomValue(cardAtom);
        const onAddOptionClick = () => {
                addEmptyOption(cardId);
        };

        return (
                <div className='flex flex-col gap-3'>
                        {optionsIds.map((optionId, optionIndex) => (
                                <Option
                                        key={optionId}
                                        {...{
                                                optionId,
                                                optionIndex
                                        }}
                                />
                        ))}
                        <button
                                type='button'
                                data-testid='add-option-btn'
                                onClick={onAddOptionClick}>
                                Add option
                        </button>
                </div>
        );
}
