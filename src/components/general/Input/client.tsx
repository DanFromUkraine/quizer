'use client';

import { useCallback, useState } from 'react';
import type { AvailableInputTypes, InputContainerProps } from './types.d.ts';
import clsx from 'clsx';

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

export function InputBody({
        extendable,
        inputAttributes
}: Pick<InputContainerProps, 'extendable' | 'inputAttributes'>) {
        return extendable ? (
                <textarea {...inputAttributes}></textarea>
        ) : (
                <input
                        {...inputAttributes}
                        className={clsx('w-full focus-within:outline-0')}
                />
        );
}
