'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useRef } from 'react';
import type { ChangeEventHandler, ComponentProps } from 'react';

type ExtendableTextAreaProps = ComponentProps<'textarea'> & {
    testId: string;
};

export default function ExtendableTextArea({
    testId,
    className,
    onChange,
    value,
    defaultValue,
    ref,
    ...props
}: ExtendableTextAreaProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextArea = useCallback(
        (textArea: HTMLTextAreaElement | null) => {
            if (!textArea) return;

            textArea.style.height = 'auto';
            textArea.style.height = `${textArea.scrollHeight}px`;
        },
        []
    );

    const handleTextAreaRef = useCallback(
        (textArea: HTMLTextAreaElement | null) => {
            textAreaRef.current = textArea;

            if (typeof ref === 'function') {
                ref(textArea);
            } else if (ref) {
                ref.current = textArea;
            }

            resizeTextArea(textArea);
        },
        [ref, resizeTextArea]
    );

    const onTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> =
        useCallback(
            (event) => {
                resizeTextArea(event.currentTarget);
                onChange?.(event);
            },
            [onChange, resizeTextArea]
        );

    useEffect(() => {
        resizeTextArea(textAreaRef.current);
    }, [defaultValue, resizeTextArea, value]);

    useEffect(() => {
        const textArea = textAreaRef.current;
        if (!textArea || typeof ResizeObserver === 'undefined') return;

        const resizeObserver = new ResizeObserver(() => {
            resizeTextArea(textArea);
        });

        resizeObserver.observe(textArea);

        return () => {
            resizeObserver.disconnect();
        };
    }, [resizeTextArea]);

    return (
        <textarea
            {...props}
            ref={handleTextAreaRef}
            data-testid={testId}
            value={value}
            defaultValue={defaultValue}
            onChange={onTextAreaChange}
            className={clsx(
                'field-sizing-content resize-none overflow-hidden break-normal wrap-anywhere whitespace-pre-wrap rounded-md border border-[#d8dde7] bg-[#f7f8fb] px-6 py-4 text-gray-800 placeholder:text-[#8f96a8] focus-within:outline-none focus-visible:outline-none',
                className
            )}></textarea>
    );
}
