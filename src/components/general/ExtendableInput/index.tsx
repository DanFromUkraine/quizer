'use client';

import clsx from 'clsx';
import { RefObject, TextareaHTMLAttributes } from 'react';

export default function ExtendableTextArea({
        ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
        ref?: RefObject<HTMLTextAreaElement | null>;
}) {
        return (
                <textarea
                        {...props}
                        ref={props?.ref}
                        className={clsx(
                                'resize-none field-sizing-content focus-within:outline-none',
                                props.className
                        )}></textarea>
        );
}
