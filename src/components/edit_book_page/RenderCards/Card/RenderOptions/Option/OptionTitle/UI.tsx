import { ChangeEventHandler } from 'react';

export default function OptionTitleUI({
        defaultValue,
        onChange,
        optionId
}: {
        defaultValue: string;
        onChange: ChangeEventHandler;
        optionId: string;
}) {
        return (
                <input
                        name={`option-${optionId}`}
                        type='text'
                        defaultValue={defaultValue}
                        onChange={onChange}
                        data-testid='optionTextField'
                        className='w-full p-3 bg-gray-200 group-hover:bg-gray-300 duration-100'
                />
        );
}
