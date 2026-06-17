import { EP_TEST_IDS } from '@/src/constants/testIds';

export function SaveAndCloseButtonUI({
    onClickAction
}: {
    onClickAction: () => void;
}) {
    return (
        <span
            onClick={onClickAction}
            data-testid={EP_TEST_IDS.cardsAsTextDialog.saveAndExitBtn}
            className='span bg-primary hover:bg-primaryHover rounded-md px-5 py-2 font-semibold text-white! duration-100'>
            Save & close
        </span>
    );
}