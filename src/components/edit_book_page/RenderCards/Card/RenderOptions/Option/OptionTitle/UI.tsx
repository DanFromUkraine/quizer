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
        console.log({ defaultValue });

        return (
                <input
                        name={`option-${optionId}`}
                        type='text'
                        defaultValue={defaultValue}
                        onChange={onChange}
                        data-testid='optionTextField'
                        className='w-full p-3 duration-150'
                />
        );
}
