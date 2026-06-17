import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function DeleteOptionButtonUI({
    onClick
}: {
    onClick: () => void;
}) {
    return (
        <button
            type='button'
            data-testid={
                EP_TEST_IDS.card.explicitCardContent.option.mainOptBody
                    .deleteBtn
            }
            className='pointer-events-auto flex size-8 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent text-xl leading-none text-[#8b92a1] duration-100 hover:text-red-500'
            onClick={onClick}>
            ×
        </button>
    );
}
