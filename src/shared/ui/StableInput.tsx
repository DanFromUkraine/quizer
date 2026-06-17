'use client';

import clsx from 'clsx';
import type { ChangeEvent, ComponentPropsWithRef } from 'react';
import { useEffect, useRef, useState } from 'react';

type StableInputProps = Omit<
    ComponentPropsWithRef<'input'>,
    'defaultValue' | 'onChange' | 'value'
> & {
    containerClassName?: string;
    inputClassName?: string;
    sizerClassName?: string;
    testId: string;
    inputValue: string;
    setInputValue: (value: string) => void | Promise<void>;
};

export default function StableInput({
    ref,
    id,
    className,
    containerClassName,
    inputClassName,
    sizerClassName,
    testId,
    setInputValue,
    inputValue,
    ...inputProps
}: StableInputProps) {
    const hasSyncedInitialValue = useRef(inputValue.length > 0);
    const [localValue, setLocalValue] = useState(inputValue);

    useEffect(() => {
        if (hasSyncedInitialValue.current || inputValue.length === 0) return;

        hasSyncedInitialValue.current = true;
        setLocalValue(inputValue);
    }, [inputValue]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const nextValue = event.target.value;

        setLocalValue(nextValue);
        void setInputValue(nextValue);
    }

    return (
        <label
            htmlFor={id}
            className={clsx('relative inline-grid w-fit', containerClassName)}>
            <span
                aria-hidden='true'
                className={clsx(
                    className,
                    'invisible w-fit whitespace-pre',
                    sizerClassName
                )}>
                {localValue || ' '}
            </span>
            <input
                {...inputProps}
                ref={ref}
                id={id}
                data-testid={testId}
                value={localValue}
                onChange={handleChange}
                className={clsx(
                    className,
                    'absolute inset-0 h-full w-full border-0 bg-transparent p-0 outline-none',
                    inputClassName
                )}
            />
        </label>
    );
}
