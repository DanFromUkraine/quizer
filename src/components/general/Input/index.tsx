'use client';

import { JSX } from 'react';
import { InputBody, useInputType } from './client';
import type {
    InputContainerProps,
    InputContainerPropsIfClearable
} from './types.d.ts';
import { ClearButton, InputNameUI, ToggleVisibilityButtonUI } from './UI';

export default function InputContainer(props: InputContainerProps): JSX.Element;
export default function InputContainer(
    props: InputContainerPropsIfClearable
): JSX.Element;
export default function InputContainer({
    inputType,
    clearable,
    inputName,
    inputAttributes,
    onClearButtonClick,
    extendable
}: InputContainerPropsIfClearable | InputContainerProps) {
    const { currentInputType, toggleInputType, isPasswordButtonVisible } =
        useInputType(inputType);

    return (
        <div className='relative flex h-12 w-96 gap-2 rounded-md border border-gray-500 px-4'>
            <InputNameUI textContent={inputName} />
            <InputBody
                {...{
                    inputType: currentInputType,
                    inputAttributes,
                    extendable
                }}
            />

            <ToggleVisibilityButtonUI
                {...{
                    currentInputType,
                    toggleInputType,
                    isPasswordButtonVisible
                }}
            />
            <ClearButton
                {...{
                    clearable,
                    onClearButtonClick: onClearButtonClick
                }}
            />
        </div>
    );
}
