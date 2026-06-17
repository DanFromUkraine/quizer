import IndexMarker from '@/src/components/general/IndexMarker';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function CorrectnessMarketButtonUI({
    optionId,
    onCheckboxClick,
    index,
    defaultChecked
}: {
    optionId: string;
    index: number;
    onCheckboxClick: () => void;
    defaultChecked: boolean;
}) {
    return (
        <label className='bg-primary pointer-events-auto relative flex h-full w-fit min-w-9 shrink-0 cursor-pointer items-center justify-center rounded-l-[10px] rounded-r-none px-2 text-white duration-150 has-checked:bg-green-600'>
            <IndexMarker
                index={index}
                className='h-full min-w-5 bg-transparent p-0 text-sm text-white'
            />
            <input
                data-testid={
                    EP_TEST_IDS.card.explicitCardContent.option.mainOptBody
                        .changeIsCorrectCheckbox
                }
                type='checkbox'
                name={`option-checkbox-${optionId}`}
                className='absolute inset-0 z-20 size-full cursor-pointer opacity-0'
                onChange={onCheckboxClick}
                checked={defaultChecked}
            />
        </label>
    );
}
