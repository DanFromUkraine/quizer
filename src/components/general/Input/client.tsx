'use client';

import { InputHTMLAttributes, useCallback, useState } from 'react';
import { ClearButtonUI } from '../../../../app/lib/componentsUI/ClearButton';
import type { AvailableInputTypes } from './types.d.ts';

export function useInputType(defaultInputType: AvailableInputTypes) {
        const isPasswordButtonVisible = defaultInputType === 'password';
        const [currentInputType, setCurrentInputType] = useState(
                () => defaultInputType
        );

        const toggleInputType = useCallback(() => {
                setCurrentInputType((prev) => {
                        return prev === defaultInputType
                                ? 'text'
                                : defaultInputType;
                });
        }, []);

        return { isPasswordButtonVisible, toggleInputType, currentInputType };
}

export function ClearButton({
        clearable,
        onClearButtonClick
}: {
        clearable: boolean;
        onClearButtonClick?: () => void;
}) {
        return <ClearButtonUI {...{ clear: onClearButtonClick, clearable }} />;
}

export function InputBody({
        currentInputType
}: {
        currentInputType: string;
        attributes: InputHTMLAttributes<Element>;
}) {
        return (
                <input
                        type={currentInputType}
                        placeholder='Some placeholder'
                        className='w-full focus-within:outline-0'
                />
        );
}
