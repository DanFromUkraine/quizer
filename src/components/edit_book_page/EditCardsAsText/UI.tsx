import { EP_TEST_IDS } from '@/src/constants/testIds';
import {
    updateAnyCardsFromTextAtom,
    updateOnlyShortCardsFromTextAtom
} from '@/src/jotai/cardAtoms';
import {
    cardsTextAtom,
    markupModeAtom,
    textInModalHasBeenChangedAtom
} from '@/src/jotai/cardsAsTextAtoms';
import { useAtomCallback } from 'jotai/utils';

export function ModeButton({
    title,
    onClick,
    hoverable,
    testId
}: {
    title: string;
    onClick: () => void;
    hoverable: boolean;
    testId: string;
}) {
    return (
        <span
            data-testid={testId}
            data-hoverable={hoverable}
            onClick={onClick}
            className='heading-4 text-md rounded-md bg-gray-300 p-2 duration-100 data-[hoverable=false]:bg-gray-400 data-[hoverable=true]:hover:bg-gray-700 data-[hoverable=true]:hover:text-gray-300'>
            {title}
        </span>
    );
}

export function SaveAndCloseButtonUI() {
    const onClick = useAtomCallback(async (get, set) => {
        const cardsText = get(cardsTextAtom);
        const markupMode = get(markupModeAtom);
        const areAnyChanges = get(textInModalHasBeenChangedAtom);

        if (!areAnyChanges) return;
        if (markupMode === 'mixed') {
            await set(updateAnyCardsFromTextAtom, cardsText);
        } else if (markupMode === 'short-only') {
            await set(updateOnlyShortCardsFromTextAtom, cardsText);
        }
        set(textInModalHasBeenChangedAtom, false);
    }) as () => void;

    return (
        <span
            onClick={onClick}
            data-testid={EP_TEST_IDS.cardsAsTextDialog.saveAndExitBtn}
            className='span rounded-md bg-primary px-5 py-2 font-semibold text-white! duration-100 hover:bg-primaryHover'>
            Save & close
        </span>
    );
}
