import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoCloseCircleOutline } from 'react-icons/io5';

export default function CorrectnessMarketButtonUI({
        optionId,
        onCheckboxClick,
        indexMarker,
        defaultChecked
}: {
        optionId: string;
        onCheckboxClick: () => void;
        indexMarker: string;
        defaultChecked: boolean;
}) {
        return (
                <label className='flex has-checked:bg-green-400 relative p-2 gap-2 justify-center items-center bg-red-400  duration-150'>
                        <div className='size-7 flex justify-center items-center p-2 rounded-full bg-white'>
                                <span>{indexMarker}</span>
                        </div>
                        <input
                                type='checkbox'
                                name={`option-checkbox-${optionId}`}
                                className='absolute inset-0 opacity-0 z-20 w-full'
                                onChange={onCheckboxClick}
                                defaultChecked={defaultChecked}
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
