import { FaCheck } from 'react-icons/fa6';

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
                <label className='group/option w-full flex has-checked:bg-green-300'>
                        <div className='relative w-8 h-full flex justify-center items-center bg-red-500 has-checked:bg-green-500 duration-150'>
                                <span>{indexMarker}</span>
                                <input
                                        type='checkbox'
                                        name={`option-checkbox-${optionId}`}
                                        className='absolute inset-0 opacity-0 z-20 peer'
                                        onChange={onCheckboxClick}
                                        defaultChecked={defaultChecked}
                                />

                                <FaCheck className='hidden peer-checked:flex text-white' />
                        </div>
                </label>
        );
}
