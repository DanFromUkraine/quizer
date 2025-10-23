'use client';

import clsx from 'clsx';
import { RefObject, TextareaHTMLAttributes } from 'react';

export default function ExtendableTextArea({
        ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
        ref?: RefObject<HTMLTextAreaElement | null>;
        testId: string;
}) {
        return (
                <textarea
                        {...props}
                        ref={props?.ref}
                        data-testId={props.testId}
                        className={clsx(
                                'resize-none field-sizing-content focus-within:outline-none whitespace-pre-wrap break-normal [overflow-wrap:anywhere]',
                                props.className
                        )}></textarea>
        );
}
