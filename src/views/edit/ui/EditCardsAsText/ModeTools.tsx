import { useAtomValue } from 'jotai';
import { changeMarkupMode, markupModeAtom } from '@/src/jotai/cardsAsTextAtoms';
import { useAtomCallback } from 'jotai/utils';
import { MarkupModes } from '@/src/types/updateCardsFromText';
import { MARKUP_MODES } from '@/src/constants/cardsAsText';

export function ModeTools() {
    const currentMode = useAtomValue(markupModeAtom);

    const getOnClick = useAtomCallback(
        (_get, set, modeId: MarkupModes) => () => {
            set(changeMarkupMode, modeId);
        }
    );

    return (
        <section className='flex flex-wrap gap-2'>
            {MARKUP_MODES.map(({ title, modeId, testId }) => (
                <span
                    key={title}
                    data-testid={testId}
                    data-hoverable={currentMode !== modeId}
                    onClick={getOnClick(modeId)}
                    className='text-md rounded-md bg-gray-300 p-2 duration-100 data-[hoverable=false]:bg-gray-400 data-[hoverable=true]:hover:bg-gray-700 data-[hoverable=true]:hover:text-gray-300'>
                    {title}
                </span>
            ))}
        </section>
    );
}