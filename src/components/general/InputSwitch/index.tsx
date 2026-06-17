export default function InputSwitch({
    currState,
    setCurrState,
    testId
}: {
    currState: boolean;
    setCurrState: (newVal: boolean) => void;
    testId: string;
}) {
    const onChange = () => {
        setCurrState(!currState);
    };

    return (
        <label
            data-ischecked={currState}
            className='relative flex h-6 w-10 rounded-xl bg-red-100 p-0.5 duration-100 has-[:checked]:!bg-blue-400'>
            <input
                type='checkbox'
                name='toggle-input'
                data-testid={testId}
                className='peer absolute top-0 left-0 h-full w-full bg-transparent opacity-0'
                checked={currState}
                onChange={onChange}
            />
            <span className='z-[2] flex size-5 rounded-full bg-white shadow-md duration-100 peer-checked:!ml-auto' />
        </label>
    );
}
