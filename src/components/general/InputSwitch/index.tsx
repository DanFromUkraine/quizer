import { useId } from 'react';

export default function InputSwitch({
        currState,
        setCurrState
}: {
        currState: boolean;
        setCurrState: (newVal: boolean) => void;
}) {
        const onChange = () => {
                console.debug("change should've happened");
                setCurrState(!currState);
        };

        console.debug({currState})

        return (
                <label
                        data-ischecked={currState}
                        className='relative flex w-10 h-6 p-0.5 has-[:checked]:!bg-blue-400 bg-red-200 duration-100 rounded-xl'>
                        <input
                                type='checkbox'
                                name="toggle-input"
                                className='absolute top-0 left-0 w-full h-full opacity-0 bg-transparent peer'
                                checked={currState}
                                onChange={onChange}
                        />
                        <span
                                className='flex size-5 rounded-full bg-white shadow-md peer-checked:!ml-auto duration-100 z-[2] '
                        />
                </label>
        );
}
