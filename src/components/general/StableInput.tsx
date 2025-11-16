'use client';

import {
        ChangeEvent,
        useCallback,
        useState,
        InputHTMLAttributes,
        useRef,
        useEffect
} from 'react';

/*
  You might not understand why we need such wrapper, but the explanation is - otherwise the input caret goes to the end on every change event.
*/

export default function StableInput({
        testId,
        setInputValue,
        inputValue,
        ...props
}: InputHTMLAttributes<HTMLInputElement> & {
        testId: string;
        inputValue: string;
        setInputValue: (s: string) => void | Promise<void>;
}) {
        const initiated = useRef(false);
        const [localValue, updateLocalValue] = useState('');

        useEffect(() => {
                if (initiated.current || inputValue.length === 0) return;
                updateLocalValue(inputValue);
                initiated.current = true;
        }, [inputValue]);

        const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;
                updateLocalValue(v);
                void setInputValue(v);
        }, []);

        return (
                <input
                        {...props}
                        data-testid={testId}
                        value={localValue}
                        onChange={onChange}
                />
        );
}
