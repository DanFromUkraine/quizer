'use client';

import {
    ChangeEvent,
    forwardRef,
    useCallback,
    useState,
    InputHTMLAttributes,
    useRef,
    useEffect
} from 'react';
import clsx from 'clsx';

type StableInputProps = InputHTMLAttributes<HTMLInputElement> & {
    containerClassName?: string;
    inputClassName?: string;
    sizerClassName?: string;
    testId: string;
    inputValue: string;
    setInputValue: (s: string) => void | Promise<void>;
};

const StableInput = forwardRef<HTMLInputElement, StableInputProps>(
    function StableInput(
        {
            id,
            className,
            containerClassName,
            inputClassName,
            sizerClassName,
            testId,
            setInputValue,
            inputValue,
            ...props
        },
        ref
    ) {
        const initiated = useRef(false);
        const [localValue, updateLocalValue] = useState('');

        useEffect(() => {
            if (initiated.current || inputValue.length === 0) return;
            updateLocalValue(inputValue);
            initiated.current = true;
        }, [inputValue]);

        const onChange = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;
                updateLocalValue(v);
                void setInputValue(v);
            },
            [setInputValue]
        );

        return (
            <label
                htmlFor={id}
                className={clsx(
                    'relative inline-grid w-fit',
                    containerClassName
                )}>
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
                    {...props}
                    ref={ref}
                    id={id}
                    data-testid={testId}
                    value={localValue}
                    onChange={onChange}
                    className={clsx(
                        className,
                        'absolute inset-0 h-full w-full border-0 bg-transparent p-0 outline-none',
                        inputClassName
                    )}
                />
            </label>
        );
    }
);

StableInput.displayName = 'StableInput';

export default StableInput;
