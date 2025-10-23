import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoCloseCircleOutline } from 'react-icons/io5';
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
                <label
                        data-testid={
                                EP_TEST_IDS.card.explicitCardContent.option
                                        .changeIsCorrectBtn
                        }
                        className='pointer-events-auto flex has-checked:bg-green-400 relative p-2 gap-2 justify-center items-center bg-gray-400  duration-150 max-[540px]:hidden'>
                        <IndexMarker index={index} />
                        <input
                                type='checkbox'
                                name={`option-checkbox-${optionId}`}
                                className='absolute inset-0 opacity-0 z-20 w-full'
                                onChange={onCheckboxClick}
                                checked={defaultChecked}
                        />
                        <div>
                                {defaultChecked ? (
                                        <IoMdCheckmarkCircleOutline className='text-4xl text-white' />
                                ) : (
                                        <IoCloseCircleOutline className='text-4xl text-white' />
                                )}
                        </div>
                </label>
        );
}
